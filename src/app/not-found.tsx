import Link from 'next/link';
import Image from 'next/image';

import { Header, Topbar } from '@/widgets/header';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { Footer } from '@/shared/ui/footer';

export default function NotFound() {
  return (
    <>
      <Topbar />
      <Header />
      <Container classname="flex flex-col items-center py-12">
        <Image
          className="w-[600px] pointer-events-none"
          src="/404.png"
          alt="Not found"
          width={1080}
          height={741}
        />
        <h1 className="text-2xl my-4 font-bold">Страница не найдена</h1>
        <Link href="/">
          <Button size="lg" className="text-base">
            Вернуться на главную
          </Button>
        </Link>
      </Container>
      <Footer />
    </>
  );
}
