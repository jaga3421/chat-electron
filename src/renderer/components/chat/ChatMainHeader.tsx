import React from 'react';
import styled from 'styled-components';
import { formatTimestampFromISOString } from '../../utils';

const Wrapper = styled.div`
  padding: 16px 24px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  background-color: var(--colors-background-light-secondary);
  width: 100%;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const Details = styled.div`
  color: var(--colors-text-light-primary);
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 590;
`;

const LastSeen = styled.div`
  font-size: 14px;
  font-weight: 300;
`;

interface ChatMainHeaderProps {
  avatarSrc: string;
  name: string;
  lastSeen: string;
}

function ChatMainHeader({
  avatarSrc,
  name,
  lastSeen,
}: ChatMainHeaderProps): React.JSX.Element {
  return (
    <Wrapper>
      <Avatar src={avatarSrc} />
      <Details>
        <Name>{name}</Name>
        <LastSeen>
          {lastSeen === 'online'
            ? 'Online'
            : `Last seen ${formatTimestampFromISOString(lastSeen)}`}
        </LastSeen>
      </Details>
    </Wrapper>
  );
}

export default ChatMainHeader;
