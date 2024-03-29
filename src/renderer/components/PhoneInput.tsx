/* eslint-disable react/require-default-props */
/**
 * PhoneInput Component
 *
 * This component is a styled input field specifically designed for phone number input.
 * It uses the libphonenumber-js library to format the input as a phone number.

 */

import React, {
  ChangeEvent,
  useState,
  ClipboardEvent,
  KeyboardEvent,
} from 'react';
import styled from 'styled-components';
import { AsYouType } from 'libphonenumber-js';

type InputProps = {
  prefix: string;
  placeholder: string;
  uponChange: (value: string) => void;
  onSubmit: () => void; // added onSubmit prop
  className?: string;
  w?: string;
  autoFocus?: boolean;
};

const Wrapper = styled.div<InputProps>`
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border-primary);
  border-radius: 10px;
  padding: 4px;
  width: ${(props) => props.w || '300px'};
`;

const Prefix = styled.span`
  margin-right: 10px;
  border-radius: 10px;
  background: var(--colors-background-light-secondary);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
`;

// eslint-disable-next-line react/function-component-definition
const PhoneInput: React.FC<InputProps> = ({
  prefix,
  placeholder,
  uponChange,
  onSubmit, // added onSubmit prop
  className,
  w,
  autoFocus,
}) => {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/\D/g, '');
    const formattedValue = new AsYouType('US').input(newValue);
    setValue(formattedValue);
    uponChange(formattedValue);
  };

  const handlePaste = (event: ClipboardEvent) => {
    const paste = event.clipboardData.getData('text');
    const pasteNumeric = paste.replace(/\D/g, '');
    const formattedPaste = new AsYouType('US').input(pasteNumeric);
    if (paste !== pasteNumeric) {
      event.preventDefault();
      setValue(formattedPaste);
      uponChange(formattedPaste);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <Wrapper
      className={className}
      w={w}
      prefix={prefix}
      placeholder={placeholder}
      uponChange={uponChange}
      onSubmit={onSubmit} // Add the onSubmit prop
    >
      <Prefix>{prefix}</Prefix>
      <StyledInput
        value={value}
        onChange={handleChange}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    </Wrapper>
  );
};

export default PhoneInput;
