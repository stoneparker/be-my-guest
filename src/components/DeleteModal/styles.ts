import styled from 'styled-components';

export const Container = styled.dialog`
  border: none;
  
  &::backdrop {
    background: rgba(0, 0, 0, 0.15);
  }
`;

export const Form = styled.form`
  text-align: center;
  padding: 15px 30px;

  h3 {
    font-weight: 400;
  }

  menu {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
`;

