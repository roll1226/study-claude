import styled from 'styled-components';
import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Sizes */
  ${props => {
    switch (props.size) {
      case 'small':
        return `
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
        `;
      case 'large':
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
        `;
      default:
        return `
          padding: 0.5rem 1rem;
          font-size: 1rem;
        `;
    }
  }}

  /* Variants */
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return `
          background-color: transparent;
          color: #646cff;
          border: 1px solid #646cff;

          &:hover:not(:disabled) {
            background-color: rgba(100, 108, 255, 0.1);
          }
        `;
      case 'danger':
        return `
          background-color: #ef4444;
          color: white;

          &:hover:not(:disabled) {
            background-color: #dc2626;
          }
        `;
      default:
        return `
          background-color: #646cff;
          color: white;

          &:hover:not(:disabled) {
            background-color: #535bf2;
          }
        `;
    }
  }}
`;

export function Button({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
}
