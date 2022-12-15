import { InputHTMLAttributes } from 'react';
import Label from '../Label';
import { Container } from './styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <Container>
      { label && <Label htmlFor={props.id}>{label}</Label> }
      <input {...props} />
    </Container>
  );
}

export default Input;