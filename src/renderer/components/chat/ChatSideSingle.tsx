/* eslint-disable react/function-component-definition */

import React from 'react';
import styled from 'styled-components';

interface ChatSideSingleProps {
  avatarSrc: string;
  name: string;
  text: string;
  timeStamp: string;
}

const Container = styled.div`
  background: var(--colors-tint-light-primary);
  border-bottom: 1px solid var(--colors-background-light-secondary);
  color: #fff;
  width: 100%;
  padding: 10px 24px;
  display: flex;
  position: relative;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
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
  font-weight: bold;
`;

const Text = styled.div`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
}) => {
  return (
    <Container>
      <Avatar>
        <img src={avatarSrc} alt="Avatar" />
      </Avatar>
      <Details>
        <Name>{name}</Name>
        <Text>{text}</Text>
      </Details>
      <TimeStamp>{timeStamp}</TimeStamp>
    </Container>
  );
};

export default ChatSideSingle;
