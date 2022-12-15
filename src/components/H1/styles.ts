import styled from 'styled-components';

import theme from '../../themes/default';

export const Text = styled.h1<{ theme: typeof theme }>`
  font-size: 1.5rem;
  letter-spacing: 4px;
  color: ${props => props.theme.title};
  font-family: 'Hammersmith One', sans-serif;
  text-transform: uppercase;
`;
