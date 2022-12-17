import styled from 'styled-components';

export const Container = styled.dialog`
  border: none;
  max-height: 80%;
  max-width: 45%;
  
  &::backdrop {
    background: rgba(0, 0, 0, 0.15);
  }
`;

export const Form = styled.form`
  padding: 40px 30px;

  menu {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  fieldset {
    border: 0;

    &:not(:last-child) {
      margin: 25px 0;
    }
  }

  legend {
    font-family: 'Playfair Display';
    font-style: italic;
    font-size: 1.125rem;
    margin-bottom: 18px;
  }
`;

export const InputRow = styled.div`
  display: flex;
  gap: 18px;
  width: 100%;
  
  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;