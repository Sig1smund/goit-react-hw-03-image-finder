import { Component } from 'react'
import SearchBar from './SearchBar'
import ImageGallery from './ImageGallery'
import ImageGalleryItem from './ImageGalleryItem';
import fetcher from 'services/fetch';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

class App extends Component {
  state = {
    search: '',
    items: [],
    page: 1,
    totalItems: 0,
    spinner: false,
    largeIMG: '',
    tags: '',
    modal: false,
  }

  modalClickToggler = () => {
    return this.setState(({ modal }) => ({
      modal: !modal,
    }))
  }
  
  getLargeImgURL = (largeIMG, tags) => {
    return this.setState({ largeIMG, tags, modal: true})
  }

  handleButtonCLick = () => {
    const { items, totalItems } = this.state;
    if (items.length < totalItems) {
      this.setState(prevState => ({ page: prevState.page + 1 }))
      return;
    }
  }

  toScrollDownOnLoad = () => {
    const setHeight = this.lastImgElement.lastElementChild.clientHeight;
    window.scrollBy({ top: setHeight * 2.43, behavior: 'smooth' });
  };

  handleFormSubmit = search => {
    return this.setState({ search, page: 1 });
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.search;
    const newSearch = this.state.search;
    const prevPage = prevState.page;
    const { search, page } = this.state;

    if (prevSearch !== newSearch) {
      this.setState({
        items: [],
        page: 1,
        totalItems: 0,
      })
    }

    if (prevSearch !== newSearch || prevPage !== page) {
      this.setState({
        spinner: true,
      });
        
      fetcher(search, page)
        .then(({ hits, totalHits }) => {
          if (totalHits === 0) {
            alert(`No images found by keyword ${search}`)
            return;
          };
          if (page === 1) {
            this.setState({ items: hits, totalItems: totalHits });
          } else {
            this.setState(prevState => ({ items: [...prevState.items, ...hits] }));
            this.toScrollDownOnLoad();
          }
        })
        .catch(error => console.log(error))
        .finally(() => { this.setState({ spinner: false }) })
    }
  }

  render() {
    const { items, spinner, largeIMG, modal, tags, totalItems } = this.state;
    
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit}/>
        <ImageGallery scroll={(Gallery) => { this.lastImgElement = Gallery }}>
          <ImageGalleryItem data={items} options={this.getLargeImgURL}/>
        </ImageGallery>
        {items.length < totalItems && <Button onClick={this.handleButtonCLick} />}
        {spinner && <Loader />}
        {modal && <Modal link={largeIMG} name={tags} onToggle={this.modalClickToggler} />}
      </>
  );
  }
};

export default App;
