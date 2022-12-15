import styled from 'styled-components';

import theme from '../../themes/default';

export const Container = styled.header<{ theme: typeof theme }>`
  background-color: ${props => props.theme.componentBackground};
  padding: 10px 60px 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  align-items: stretch;

  /* height: 600px; */
  img {
    max-width: 140px;
    margin-right: 60px;
    margin-bottom: 10px;
  }
`;

export const Navbar = styled.nav`
  ul {
    height: 100%;
    list-style-type: none;
    display: flex;
    flex-direction: row;
  }
`;

export const NavigationOption = styled.li<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  border-bottom: ${props => props.selected ? `5px solid ${props.theme.secondary}` : 'none'};
  cursor: pointer;

  font-size: 1.125rem;
  color: ${props => props.selected ? props.theme.text : '#939DA7'};

  &:not(:last-child) {
    margin-right: 60px;
  }
`;

