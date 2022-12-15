import ReactSelect, { Props } from 'react-select';

import Label from '../Label';

import { Container } from './styles';

export interface SelectProps extends Props {
  label?: string;
}

const Select: React.FC<SelectProps> = ({ label, ...props }) => {
  return (
    <Container>
      { label && <Label htmlFor={props.id}>{label}</Label> }
      <ReactSelect
        {...props}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: '#EEE67B',
          },
        })}
        styles={{
          container: (styles) => ({ ...styles, width: '100%' }),
          control: (styles) => ({ ...styles, height: '42px' }),
          multiValue: (styles) => {
            return {
              ...styles,
              backgroundColor: '#A8A031',
              color: '#FFF',
              borderRadius: '12px',
              padding: '1px 6px',
            };
          },
          multiValueLabel: (styles) => ({
            ...styles,
            color: '#FFF',
          }),
        }}
      />
    </Container>
  );
}

export default Select;