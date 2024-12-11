'use client';

import { useEffect, useState } from 'react';

import { useVerify } from '../../api/use-verify';

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/shared/ui/input-otp';
import { Title } from '@/shared/ui/title';

import { TFormRegisterValues } from '../../model/auth-form-schema';

interface Props {
  onClose?: () => void;
  registerValues: TFormRegisterValues;
}

export const VerifyCodeInput = ({ onClose, registerValues }: Props) => {
  const [code, setCode] = useState<string>('');

  const { sendCode, isPending, isError } = useVerify(registerValues, onClose);

  useEffect(() => {
    if (code.length === 6) {
      sendCode(code);
    }
  }, [code]);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Title>Введите код подтверждения</Title>
      <InputOTP maxLength={6} value={code} onChange={(v) => setCode(v)} disabled={isPending}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      {isError && <p className="text-destructive">Неправильный код</p>}
    </div>
  );
};
