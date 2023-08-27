import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';

import {
  SearchBarTag,
  SearchForm,
  SearchBtn,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.search.trim() === '') {
      toast.warn('Please enter something for picture search', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    this.props.onFormSubmit(this.state.search);
    this.resetForm();
  };

  inputChange = evt => {
    this.setState({ search: evt.currentTarget.value });
  };

  resetForm = () => {
    this.setState({ search: '' });
  };

  render() {
    return (
      <SearchBarTag>
        <SearchForm className="form" onSubmit={this.handleSubmit}>
          <SearchBtn type="submit" className="button">
            <BsSearch />
          </SearchBtn>

          <SearchFormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.inputChange}
          />
        </SearchForm>
      </SearchBarTag>
    );
  }
}
