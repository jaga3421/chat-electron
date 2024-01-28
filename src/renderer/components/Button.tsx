/* eslint-disable react/require-default-props */
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type ButtonProps = {
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  w?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingIcon = styled(AiOutlineLoading3Quarters)`
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -8px;
  animation: ${spin} 2s linear infinite;
`;

const StyledButton = styled.button<ButtonProps>`
  position: relative;
  border: none;
  padding: 8px;
  width: ${(props) => props.w || '300px'};
  background-color: ${(props) =>
    props.type === 'primary'
      ? 'var(--colors-text-light-primary)'
      : 'var(--colors-text-light-quaternary)'};
  color: var(--colors-background-light-primary);
  border-radius: 10px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled || props.loading ? '0.8' : '1')};
  cursor: ${(props) =>
    props.disabled || props.loading ? 'not-allowed' : 'pointer'};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  ${(props) =>
    props.type === 'secondary' &&
    css`
      &.secondary {
        background-color: var(--colors-text-light-quaternary);
      }
    `}

  ${(props) =>
    props.loading &&
    css`
      pointer-events: none;

      &:after {
        content: '';
      }
    `}
`;

// eslint-disable-next-line react/function-component-definition
const Button: React.FC<ButtonProps> = ({
  type,
  disabled = false,
  loading = false,
  className,
  w,
  onClick,
  children,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      disabled={disabled}
      loading={loading}
      className={className}
      w={w}
    >
      {children}
      {loading && <LoadingIcon />}
    </StyledButton>
  );
};

export default Button;
