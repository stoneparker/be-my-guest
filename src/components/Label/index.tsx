import { LabelHTMLAttributes } from 'react';
import { Component } from './styles';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children }) => {
  return (
    <Component>{children}</Component>
  );
}

export default Label;
