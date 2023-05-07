import propTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { GalleryItem, GalleryImage } from './imageGalleryItem.styled';

export default function ImageGalleryItem({ data, options }) {
  return (
    Array.isArray(data) &&
    data.map(item => {
      return (
        <GalleryItem key={nanoid()} className="ImageGalleryItem">
          <GalleryImage
            src={item.webformatURL}
            srcSet={item.largeImageURL}
            alt={item.tags}
            className="ImageGalleryItem-image"
            onClick={() => options(item.largeImageURL, item.tags)}
          />
        </GalleryItem>
      );
    })
  );
}

ImageGalleryItem.propTypes = {
  data: propTypes.array,
  options: propTypes.func,
};
