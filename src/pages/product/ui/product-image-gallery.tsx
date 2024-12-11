'use client';

import ReactImageGallery, { type ReactImageGalleryItem } from 'react-image-gallery';

import type { IProductWithCartAndFav } from '@/entities/product';

import './product-image-gallery.css';

interface Props {
  product?: IProductWithCartAndFav | null;
}

export const ProductImageGallery = ({ product }: Props) => {
  if (!product) return;
  const images: ReactImageGalleryItem[] = product?.images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <div>
      <ReactImageGallery
        items={images}
        thumbnailPosition="left"
        showPlayButton={false}
        showFullscreenButton={false}
        showNav={false}
      />
    </div>
  );
};
