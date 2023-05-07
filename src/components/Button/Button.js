import propTypes from 'prop-types';
import { ButtonContainer, LoadButton } from './button.styled';

export default function Button({ onClick }) {
  return (
    <ButtonContainer className="Button-block">
      <LoadButton type="button" className="Button" onClick={onClick}>
        Load more
      </LoadButton>
    </ButtonContainer>
  );
}

Button.propTypes = {
  onClick: propTypes.func,
};
