import { CheckoutBlock } from '../checkout-block';
import {
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';

import type { Control } from 'react-hook-form';
import type { TFormCheckoutValues } from '../../model/checkout-form-schema';
import dynamic from 'next/dynamic';

interface Props {
  classname?: string;
  control: Control<TFormCheckoutValues>;
}

const AddressInput = dynamic(() => import('@/shared/ui/address-input'), { ssr: false });

export const CheckoutAddressForm = ({ classname, control }: Props) => {
  return (
    <CheckoutBlock title="3. Адрес доставки" classname={classname}>
      <div className="flex flex-col gap-4">
        <FormField
          control={control}
          name={'address'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ваш адрес</FormLabel>
              <div className="flex relative">
                <FormControl>
                  <AddressInput
                    onChange={field.onChange}
                    placeholder="Введите ваш адрес"
                    defaultValue={control._defaultValues.address}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormInput
          control={control}
          className="bg-white"
          name="comment"
          label="Комментарий к заказу"
          isTextarea={true}
          placeholder="Уточнения по адресу"
        />
      </div>
    </CheckoutBlock>
  );
};
