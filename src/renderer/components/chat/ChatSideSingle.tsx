/* eslint-disable react/require-default-props */
/* eslint-disable react/function-component-definition */

import React from 'react';
import styled from 'styled-components';
import { getSideBarTimeStamp } from '../../utils';

interface ChatSideSingleProps {
  avatarSrc: string;
  name: string;
  text: string;
  timeStamp: string;
  isselected?: boolean;
  onClick?: () => void;
}
const Container = styled.div<{ isselected?: boolean }>`
  background: ${(props) =>
    props.isselected ? 'var(--colors-tint-light-primary)' : '#e7e2e2'};
  border-bottom: 1px solid
    ${(props) =>
      props.isselected
        ? 'var(--colors-background-light-secondary)'
        : '#c9c9cc'};
  color: ${(props) => (props.isselected ? '#fff' : 'initial')};
  width: 100%;
  padding: 4px 24px;
  display: flex;
  position: relative;
  cursor: pointer;
  transition: opacity 0.5s ease-in-out;
  &:hover {
    opacity: 0.9;
  }
`;

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Details = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: calc(100% - 56px - 24px - 10px);
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Text = styled.div`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 400;
`;

const TimeStamp = styled.div`
  font-size: 14px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ChatSideSingle: React.FC<ChatSideSingleProps> = ({
  avatarSrc,
  name,
  text,
  timeStamp,
  isselected = false,
  onClick,
}) => {
  return (
    <Container isselected={isselected} onClick={onClick}>
      <Avatar>
        <img src={avatarSrc} alt="Avatar" />
      </Avatar>
      <Details>
        <Name>{name}</Name>
        <Text>{text}</Text>
      </Details>
      <TimeStamp>{getSideBarTimeStamp(timeStamp)}</TimeStamp>
    </Container>
  );
};

export default ChatSideSingle;
