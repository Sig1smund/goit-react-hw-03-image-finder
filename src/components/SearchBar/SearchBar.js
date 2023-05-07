import { Component } from 'react';
import propTypes from 'prop-types';
import {
  HeaderBar,
  SearchForm,
  FormButton,
  FormInput,
} from './searchBar.styled';

export default class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = e => {
    const { value } = e.currentTarget;
    this.setState({ inputValue: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputValue.trim() === '') {
      return alert('Keyword is required');
    }

    const { inputValue } = this.state;
    this.props.onSubmit(inputValue);

    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <HeaderBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <FormButton type="submit">
            {/* <span className="button-label">Search</span> */}
            Search
          </FormButton>

          <FormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="inputValue"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </HeaderBar>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: propTypes.func,
};
