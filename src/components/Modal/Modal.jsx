import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import { Overlay, ModalDiv } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  onOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onCloseModal();
    }
  };

  onPressExit = evt => {
    if (evt.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onPressExit);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onPressExit);
  }

  render() {
    return createPortal(
      <Overlay onClick={this.onOverlayClick}>
        <ModalDiv>
          <img src={this.props.largeImageURL} alt="Large_image" />
        </ModalDiv>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
