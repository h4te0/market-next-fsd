import { cn } from '@/shared/lib/tailwind-merge';

interface Props {
  className?: string;
}

export const FavoritesEmpty = ({ className }: Props) => {
  return (
    <div className={cn('h-[620px] flex items-center justify-center', className)}>
      <p className="text-xl text-gray-400 tablet:text-xs">
        Вы ещё не добавили ни одного товара в избранное
      </p>
    </div>
  );
};
