import Image from 'next/image';

export const MyOrdersEmpty = () => {
  return (
    <>
      <div className="flex items-center justify-center gap-4 w-full h-full">
        <Image src="/empty-box.png" alt="empty" width={80} height={80} className="tablet:hidden" />
        <p className="text-gray-400 text-sm tablet:hidden">
          У вас пока нет ни одного заказа. Оформите Ваш первый заказ и он отобразится здесь.
        </p>
        <p className="hidden tablet:flex text-gray-400 text-sm phone:text-xs">
          У вас не было заказов
        </p>
      </div>
    </>
  );
};
