import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from '../../services/api';

import { Searchbar } from '../Searchbar/Searchbar';
import { AppClass } from './App.style';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    images: [],
    loading: false,
    error: null,
    largeImageURL: null,
    showBtn: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;
    // якщо попередній запит/сторінка не дорівнює поточному запиту/сторінці
    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      try {
        this.setState({
          loading: true,
        });
        fetchImages(searchValue, page).then(data =>
          this.setState(prevState => ({
            images: [...prevState.images, ...data.data.hits],
            showBtn: page < Math.ceil(data.data.total / 12),
          }))
        );

        // якщо немає результу пошуку ( массив = 0)
        if (this.state.images === 0) {
          toast.info(
            'Sorry, there are no results for your request. Please, enter something different.',
            {
              position: 'top-center',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            }
          );
        }
      } catch (err) {
        this.setState({
          error: err.message,
        });
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  receiveSearchValue = search => {
    this.setState({
      searchValue: search,

      // скидуємо значення до початкового
      page: 1,
      images: [],
    });
  };

  openModalWithLargeImage = url => {
    this.setState({ largeImageURL: url });
  };

  closeModal = () => {
    this.setState({ largeImageURL: null });
  };

  onClickLoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { loading, images, error, largeImageURL, showBtn } = this.state;

    return (
      <AppClass>
        <Searchbar onFormSubmit={this.receiveSearchValue} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            onImageClick={this.openModalWithLargeImage}
          />
        )}

        {loading && <Loader />}
        {error && <h3>{error.message}</h3>}

        {showBtn && (
          <Button onBtnClick={this.onClickLoadMoreBtn} loading={loading} />
        )}
        {largeImageURL && (
          <Modal onCloseModal={this.closeModal} largeImageURL={largeImageURL} />
        )}
        <ToastContainer />
      </AppClass>
    );
  }
}
