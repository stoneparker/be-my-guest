import { ButtonHTMLAttributes } from 'react';
import { Container } from './styles';

export interface ButtonProps {
  loading?: boolean;
  theme?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({ theme = 'primary', children }) => {
  return (
    <Container buttonTheme={theme}>{children}</Container>
  );
}

export default Button;
