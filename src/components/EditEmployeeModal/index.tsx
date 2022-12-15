import { useEffect, useRef, Ref } from 'react';

import Button from '../../components/Button';
import H1 from '../../components/H1';
import Input from '../../components/Input';
import Select from '../../components/Select';

import { Container, Form, InputRow } from './styles';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

interface EditEmployeeModalProps {
  open: boolean;
  close: () => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ open, close }) => {
  const modalRef: Ref<HTMLDialogElement> = useRef(null);

  function handleSubmit() {
    close();
  }

  useEffect(() => {
    if (open) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [open]);

  return (
    <Container ref={modalRef}>
      <Form method='dialog' onSubmit={handleSubmit}>
        <H1>Adicionar funcionário</H1>
        <fieldset>
          <legend>Dados pessoais</legend>
          <InputRow>
            <Input type='text' id='firstName' label='Primeiro nome' />
            <Input type='text' id='lastName' label='Último nome' />
          </InputRow>
          <InputRow>
            <Input type='text' id='document' label='Documento' />
            <Input type='text' id='imageUrl' label='URL da imagem' />
          </InputRow>
          <InputRow>
            <Input type='text' id='email' label='E-mail' />
            <Input type='text' id='phone' label='Telefone' />
          </InputRow>
          <InputRow>
            <Input type='text' id='address' label='Endereço (Cidade - Estado)' />
          </InputRow>
        </fieldset>
        <fieldset>
          <legend>Trabalho</legend>
          <InputRow>
            <Select
              options={options}
              isMulti
              placeholder=''
              label='Unidades'
            />
          </InputRow>
          <InputRow>
            <Select
              options={options}
              isMulti
              placeholder=''
              label='Cargo'
            />
            <Input type='date' id='vr' label='Data de início' />
          </InputRow>
          <InputRow>
            <Input type='text' id='salary' label='Salário (R$)' />
            <Input type='text' id='vr' label='Vale refeição (R$)' />
            <Input type='text' id='vt' label='Vale transporte (R$)' />
          </InputRow>
        </fieldset>
        <footer>
          <menu>
            <Button type='submit' theme='secondary'>Cancelar</Button>
            <Button type='submit' value='confirm'>Salvar</Button>
          </menu>
        </footer>
      </Form>
    </Container>
  );
}

export default EditEmployeeModal;
