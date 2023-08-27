import { ImageGalleryPhoto } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item, onImageClick }) => {
  const { id, tags, webformatURL, largeImageURL } = item;
  return (
    <ImageGalleryPhoto key={id}>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => {
          onImageClick(largeImageURL);
        }}
      />
    </ImageGalleryPhoto>
  );
};
