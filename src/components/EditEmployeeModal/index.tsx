import { useEffect, useRef, useState, Ref } from 'react';

import Button from '../../components/Button';
import H1 from '../../components/H1';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { api } from '../../services/server';
import { Employee } from '../../types/employee';

import { Container, Form, InputRow } from './styles';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

interface EditEmployeeModalProps {
  employee: Employee | null;
  close: () => void;
  open: boolean;
}

const newEmployee: Employee = {
  address: '',
  cpf: '',
  email: '',
  firstName: '',
  lastName: '',
  healthPlan: '',
  phoneNumber: '',
  role: '', 
  salary: 0,
  vr: 0,
  vt: 0,
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ employee, close, open }) => {
  const modalRef: Ref<HTMLDialogElement> = useRef(null);

  const [values, setValues] = useState<Employee>(newEmployee);

  // @TODO: handle selects RE1QUIREDDDD
  async function handleSubmit() {
    const request = employee ? api.post : api.put;

    await request('/hotelaria/demo/employee', values);

    close();
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.currentTarget.name]: e.target.value });
  }

  useEffect(() => {
    if (open) {
      modalRef.current?.showModal();
      employee && setValues(employee);
    } else {
      modalRef.current?.close();
      setValues(newEmployee);
    }
  }, [open]);

  return (
    <Container ref={modalRef}>
      <Form method='dialog' onSubmit={handleSubmit}>
        <H1>Adicionar funcionário</H1>
        <fieldset>
          <legend>Dados pessoais</legend>
          <InputRow>
            <Input
              type='text'
              id='firstName'
              name='firstName'
              label='Primeiro nome'
              value={values.firstName}
              onChange={onChange}
              required
            />
            <Input
              type='text'
              id='lastName'
              name='lastName'
              label='Último nome'
              value={values.lastName}
              onChange={onChange}
              required
            />
          </InputRow>
          <InputRow>
            <Input
              type='email'
              id='email'
              name='email'
              label='E-mail'
              value={values.email}
              onChange={onChange}
              required
            />
          </InputRow>
          <InputRow>
            <Input
              type='text'
              id='cpf'
              name='cpf'
              label='CPF'
              value={values.cpf}
              onChange={onChange}
              required
            />
            <Input
              type='text'
              id='phoneNumber'
              name='phoneNumber'
              label='Telefone'
              value={values.phoneNumber}
              onChange={onChange}
              required
            />
          </InputRow>
          <InputRow>
            <Input
              type='text'
              id='address'
              name='address'
              label='Endereço (Cidade - Estado)'
              value={values.address}
              onChange={onChange}
              required
            />
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
              // value={values.unit}
              // onChange={onChange}
            />
          </InputRow>
          <InputRow>
            <Select
              options={options}
              isMulti
              placeholder=''
              label='Cargo'
              required
            />
          </InputRow>
          <InputRow>
            <Input
              type='number'
              id='salary'
              name='salary'
              label='Salário (R$)'
              value={values.salary}
              onChange={onChange}
              required
            />
            <Input
              type='number'
              id='vr'
              name='vr'
              label='Vale refeição (R$)'
              value={values.vr}
              onChange={onChange}
              required
            />
            <Input
              type='number'
              id='vt'
              name='vt'
              label='Vale transporte (R$)'
              value={values.vt}
              onChange={onChange}
              required
            />
          </InputRow>
        </fieldset>
        <footer>
          <menu>
            <Button type='button' theme='secondary' onClick={close}>Cancelar</Button>
            <Button type='submit' value='confirm'>Salvar</Button>
          </menu>
        </footer>
      </Form>
    </Container>
  );
}

export default EditEmployeeModal;
