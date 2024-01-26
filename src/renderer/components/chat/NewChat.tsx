/* eslint-disable no-undef */
import styled from 'styled-components';
import Pencil from '../../assets/pencil.svg';

const StyledDiv = styled.div`
  width: 60px;
  height: 60px;
  background-image: url(${Pencil});
  filter: drop-shadow(0px 3.294px 15.647px rgba(0, 113, 238, 0.16));
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: var(--colors-tint-light-primary);
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.9;
  }
`;

function NewChat() {
  return <StyledDiv className="new-chat" />;
}

export default NewChat;
