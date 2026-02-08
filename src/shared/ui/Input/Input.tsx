import { useId } from 'react';
import styled from 'styled-components';
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

const InputLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.87);
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-family: inherit;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.87);
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid ${props => props.$hasError ? '#ef4444' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #646cff;
    background-color: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const InputError = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
`;

export function Input({
  label,
  error,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <InputWrapper>
      {label && (
        <InputLabel htmlFor={inputId}>
          {label}
        </InputLabel>
      )}
      <StyledInput id={inputId} $hasError={!!error} {...props} />
      {error && <InputError>{error}</InputError>}
    </InputWrapper>
  );
}
