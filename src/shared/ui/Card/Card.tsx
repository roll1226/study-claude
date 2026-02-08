import styled from 'styled-components';
import type { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: 'low' | 'medium' | 'high';
}

const StyledCard = styled.div<CardProps>`
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }

  ${props => {
    switch (props.elevation) {
      case 'low':
        return 'box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);';
      case 'high':
        return 'box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);';
      default:
        return 'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);';
    }
  }}
`;

export function Card({
  elevation = 'medium',
  children,
  ...props
}: CardProps) {
  return (
    <StyledCard elevation={elevation} {...props}>
      {children}
    </StyledCard>
  );
}
