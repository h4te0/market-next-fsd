'use client';

import { useEffect, useState } from 'react';
import ReactImageGallery, { type ReactImageGalleryItem } from 'react-image-gallery';

import type { IProductWithCartAndFav } from '@/entities/product';

import './product-image-gallery.css';

interface Props {
  product?: IProductWithCartAndFav | null;
}

export const ProductImageGallery = ({ product }: Props) => {
  const [windowWidth, setWindowWidth] = useState<number>(1920);

  useEffect(() => {
    if (typeof window !== 'undefined') setWindowWidth(window.innerWidth);
  }, []);

  if (!product) return;

  const images: ReactImageGalleryItem[] = product?.images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <div className="min-h-[396px]">
      <ReactImageGallery
        items={images}
        showThumbnails={windowWidth > 768}
        showBullets={windowWidth < 768}
        thumbnailPosition={windowWidth > 768 ? 'left' : 'bottom'}
        showPlayButton={false}
        showFullscreenButton={false}
        showNav={false}
      />
    </div>
  );
};
