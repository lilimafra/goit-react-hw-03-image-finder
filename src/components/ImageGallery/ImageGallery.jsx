import React from 'react';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryTag } from './ImageGallery.styled.js';

export const ImageGallery = ({ images, onImageClick }) => {
  // console.log(images);
  return (
    <ImageGalleryTag>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            item={image}
            onImageClick={onImageClick}
          />
        );
      })}
    </ImageGalleryTag>
  );
};
