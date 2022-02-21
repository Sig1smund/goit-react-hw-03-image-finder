import { Component } from 'react'
import SearchBar from './searchBar'
import ImageGallery from './imageGallery'
import ImageGalleryItem from './imageGalleryItem';
// import fetcher from 'services/fetch';
import './styles.css';


  const KEY = '25175728-94f0f247d27e4ed37775dc2a1';
  const BASE_URL = 'https://pixabay.com/api';

class App extends Component {
  state = {
    search: '',
    items: [],
    page: 1,
    spinner: false,
  }

  handleFormSubmit = search => {
    return this.setState({search})
  }

  async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.search;
    const newSearch = this.state.search;
    const { search, page } = this.state;

    if (prevSearch !== newSearch) {
      this.setState({
        items: [],
        page: 1,
      })
    }

    if (prevSearch !== newSearch || prevState.page !== this.state.page) {
      this.setState({
        spinner: true,
      });
        
      fetch(
    `${BASE_URL}/?q=${search}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`No results from searching by keyword ${search}`)
    );
  })
        .then((items) => {
          if (items.hits.lenght === 0) {
            alert(`No images found by keyword ${search}`)
          }

          this.setState({ items: [...this.state.items, ...items.hits] })
        })
        .finally(() => { this.setState({ spinner: false }) })
    }
  }

  render() {
    const { items } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery>
          <ImageGalleryItem data={items}/>
        </ImageGallery>
      </>
  );
  }
};

export default App;