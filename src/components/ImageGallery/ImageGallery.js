import propTypes from 'prop-types';
import { Gallery } from './imageGallery.styled';

export default function ImageGallery({ children, scroll }) {
  return <Gallery ref={scroll}>{children}</Gallery>;
}

ImageGallery.propTypes = {
  children: propTypes.node,
  scroll: propTypes.func,
};
