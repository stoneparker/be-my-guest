import styled from 'styled-components';

import theme from '../../themes/default';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Main = styled.main<{ theme: typeof theme }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 80px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 30px;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;

  thead {
    border-bottom: 15px solid ${props => props.theme.background};
  }

  th {
    text-align: left;
    font-weight: 400;
    color: 0.75rem;
  }

  tbody tr {
    background-color: ${props => props.theme.componentBackground};
    border-bottom: 15px solid ${props => props.theme.background};
  }

  tbody tr td {
    padding: 20px 5px;
    
    &:first-child {
      padding-left: 20px;
    }

    &:last-child {
      padding-right: 20px;
    }
  }
`;

export const Employee = styled.div`
  span {
    font-size: 0.875rem;
    color: #9D9D9D;
  }
`;

export const Contacts = styled.div`
  p {
    display: flex;
    gap: 10px;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }
`;

export const Units = styled.div`
  display: flex;
  gap: 5px;
  max-width: 200px;
  flex-wrap: wrap;

  span {
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.componentBackground};

    border-radius: 10px;
    padding: 4px 10px;
    font-size: 0.75rem;

    flex-shrink: 0;
  }
`;

export const Salary = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
