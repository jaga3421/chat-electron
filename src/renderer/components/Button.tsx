/* eslint-disable react/require-default-props */
import React from 'react';
import styled, { css } from 'styled-components';

type ButtonProps = {
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  w?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

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
      &::after {
        content: 'L';
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
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
    </StyledButton>
  );
};

export default Button;
