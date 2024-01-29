/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';
import Linkify from 'react-linkify';
import formatTimestamp from '../../utils';

const Wrapper = styled.div<{ type: 'sent' | 'received' }>`
  padding: 8px 16px;
  margin-bottom: 8px;
  font-size: 16px;
  border-radius: 12px;
  position: relative;
  width: 52%;
  background: ${({ type }) =>
    type === 'sent'
      ? 'var(--colors-tint-light-primary, #0071EE)'
      : 'var(--colors-background-light-tertiary, #E5E5EA)'};
  color: ${({ type }) =>
    type === 'sent'
      ? 'var(--colors-text-light-secondary, #FFF)'
      : 'var(--colors-text-light-primary)'};
  margin-left: ${({ type }) => (type === 'sent' ? 'auto' : '0')};
  &:first-child {
    margin-top: auto;
  }
`;

const Timestamp = styled.div`
  font-size: 10px;
  text-align: right;
`;

interface ChatBubbleProps {
  message: string;
  timestamp: number;
  type: 'sent' | 'received';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  timestamp,
  type,
}) => (
  <Wrapper type={type}>
    <Linkify
      componentDecorator={(decoratedHref, decoratedText, key) => (
        <a target="_blank" href={decoratedHref} key={key} rel="noreferrer">
          {decoratedText}
        </a>
      )}
    >
      {message}
    </Linkify>
    <Timestamp>{formatTimestamp(timestamp)}</Timestamp>
  </Wrapper>
);

export default ChatBubble;
