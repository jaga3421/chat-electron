/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface StatusDivProps {
  isOnline: boolean;
  isVisible: boolean;
}

const StatusDiv = styled.div<StatusDivProps>`
  position: fixed;
  bottom: 0;
  font-size: 9px;
  padding: 1px;
  text-align: center;
  width: 100%;
  color: #fff;
  background: ${(props) => (props.isOnline ? '#50ba50' : '#e06b69')};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  transition: visibility 0.5s ease-in-out;
`;

const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  const [isVisible, setIsVisible] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  const onOnline = () => {
    if (wasOffline) {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 3000);
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      onOnline();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsVisible(true);
      setWasOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onOnline, wasOffline]);

  return (
    <StatusDiv isOnline={isOnline} isVisible={isVisible}>
      {isOnline ? 'you are back online' : 'you are offline'}
    </StatusDiv>
  );
};

export default NetworkStatus;
