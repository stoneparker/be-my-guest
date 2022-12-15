import styled from 'styled-components';

import theme from '../../themes/default';

export const Container = styled.button<{ theme: typeof theme, buttonTheme: string }>`
  background-color: ${props => (
    {
      primary: props.theme.primary,
      secondary : 'transparent',
      danger: props.theme.danger,
    }[props.buttonTheme]
  )};

  color: ${props => (
    {
      primary: props.theme.componentBackground,
      secondary : '#B2B2B2',
      danger: props.theme.componentBackground,
    }[props.buttonTheme]
  )};

  border: 1px solid ${props => (
    {
      primary: props.theme.primary,
      secondary : '#B2B2B2',
      danger: props.theme.danger,
    }[props.buttonTheme]
  )};

  padding: 20px 30px;
  cursor: pointer;
  font-size: 0.875rem;
`;
