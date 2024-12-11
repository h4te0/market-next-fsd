'use client';

import { Heart } from 'lucide-react';
import { useAddToFavorites } from '../api/use-add-to-favorites';
import { useEffect, useState } from 'react';

interface Props {
  id: number;
  isInFavorites: boolean;
}

export const AddToFavoritesButton = ({ id, isInFavorites }: Props) => {
  const { addToFavorites, isPending, isSuccess } = useAddToFavorites();
  const [active, setActive] = useState(isInFavorites);

  const addToFavoritesHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    addToFavorites(id);
    e.stopPropagation();
  };

  useEffect(() => {
    if (isSuccess) setActive(!active);
  }, [isSuccess]);

  if (active)
    return (
      <div
        className="aspect-square hover:scale-110 duration-300 ease-in-out cursor-pointer"
        onClick={addToFavoritesHandler}>
        <Heart
          height={26}
          width={26}
          color="#DF0613"
          fill="#F6B5B9"
          className={isPending ? 'scale-90 opacity-40 pointer-events-none' : ''}
        />
      </div>
    );

  return (
    <div
      className="aspect-square hover:scale-110 duration-300 ease-in-out cursor-pointer"
      onClick={addToFavoritesHandler}>
      <Heart
        height={26}
        width={26}
        className={isPending ? 'scale-90 opacity-40 pointer-events-none' : ''}
      />
    </div>
  );
};
