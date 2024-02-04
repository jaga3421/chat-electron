/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { randomMessage } from '../../utils/randomMessage';
import { getMessage } from '../../slices/chatSlice';
import sendIcon from '../../assets/send.svg';
import webSocket from '../../utils/webSocket';

const Wrapper = styled.div`
  display: flex;
  height: 72px;
  padding: 16px;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 100px;
  background: var(--colors-background-light-seventh);
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
`;

const Button = styled.button`
  background: url(${sendIcon}) var(--colors-tint-light-primary) no-repeat center;
  border: none;
  cursor: pointer;
  padding: 2px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface ChatInputBoxProps {
  placeholder: string;
  channelID: string;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  placeholder,
  channelID,
}) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const sendMessage = () => {
    if (message.trim() !== '') {
      webSocket.sendMessage(channelID, message);
      setMessage('');
    }

    // Mock simulation of a response from the server
    if (!navigator.onLine) return;
    setTimeout(() => {
      dispatch(getMessage(randomMessage() as any));
    }, 4000);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const handleClick = () => {
    sendMessage();
  };

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          placeholder={placeholder}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyUp={handleKeyPress}
        />
      </InputWrapper>
      <Button onClick={handleClick} disabled={!message} />
    </Wrapper>
  );
};

export default ChatInputBox;
