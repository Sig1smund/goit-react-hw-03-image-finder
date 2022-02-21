import '../styles.css';

export default function ImageGalleryItem({ data }) {
  return data.map(item => {
    return (
      <li key={item.id} className="ImageGalleryItem">
        <img
          src={item.webformatURL}
          alt={item.tags}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  });
}
