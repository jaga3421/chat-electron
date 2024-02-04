/* eslint-disable react/function-component-definition */
import React from 'react';
import { useDispatch } from 'react-redux';
import { IoLogOut } from 'react-icons/io5';
import styled from 'styled-components';
import { clearToken } from '../slices/authSlice';

const LogoutButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 50%;

  svg {
    color: var(--colors-tint-light-primary);
  }

  &:hover {
    background: var(--colors-tint-light-primary);

    svg {
      color: #fff;
    }
  }
`;

const LogOut: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearToken());
  };

  return (
    <LogoutButton onClick={handleLogout}>
      <IoLogOut />
    </LogoutButton>
  );
};

export default LogOut;
