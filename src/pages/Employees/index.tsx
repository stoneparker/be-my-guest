import { useState } from 'react';

import { Mail, Call, Info, Delete, Edit } from 'styled-icons/material-rounded';

import Header from '../../components/Header';
import Button from '../../components/Button';
import H1 from '../../components/H1';
import DeleteModal from '../../components/DeleteModal';
import EditEmployeeModal from '../../components/EditEmployeeModal';

import { Employee as IEmployee } from '../../types/employee';

import { Container, Main, Table, Employee, Contacts, Units, Salary, Actions } from './styles';

const employee: IEmployee = {
  address: 'Rua Teste',
  cpf: '18238230',
  email: 'teste@example.com',
  firstName: 'Vitoria',
  lastName: 'Bezerra',
  healthPlan: '1bhdsa89',
  phoneNumber: '123124345',
  role: 'Softwqre engigeieiei', 
  salary: 1232,
  vr: 123131,
  vt: 123,
}

const Employees: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<IEmployee | null>(null);
  const [showEditModal, setShowEditModal] = useState<IEmployee | null>(null);

  return (
    <Container>
      <Header/>
      <Main>
        <header>
          <H1>Funcionários</H1>
          <Button>Adicionar funcionários</Button>
        </header>

        <Table>
          <thead>
            <tr>
              <th scope='col'>Funcionário</th>
              <th scope='col'>CPF</th>
              <th scope='col'>Contatos</th>
              <th scope='col'>Endereço</th>
              <th scope='col'>Unidades</th>
              <th scope='col'>Remuneração</th>
              <th scope='col'>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Employee>
                  <img src='https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt='' />
                  <div>
                    <p>Mohammed Silva</p>
                    <span>Supervisor de reservas</span>
                  </div>
                </Employee>
              </td>
              <td>999999999/99</td>
              <td>
                <Contacts>
                  <p>
                    <Mail size={21} color='#C3C3C3' />
                    email@example.com
                  </p>
                  <p>
                    <Call size={21} color='#C3C3C3' />
                    (11) 9 9999-9999
                  </p>
                </Contacts>
              </td>	
              <td>Recife - PE</td>
              <td>
                <Units>
                  <span>Recife - PE</span>
                  <span>São Luís - MA</span>
                </Units>
              </td>
              <td>
                <Salary>
                  R$ 9500.00
                  <Info size={18} color='#C3C3C3'/>
                </Salary>
              </td>
              <td>
                <Actions>
                  <button onClick={() => setShowEditModal(employee)}>
                    <Edit size={24} color='#575757'/>
                  </button>

                  <button onClick={() => setShowDeleteModal(employee)}>
                    <Delete size={24} color='#575757'/>
                  </button>
                </Actions>
              </td>
            </tr>
          </tbody>
        </Table>
      </Main>

      <DeleteModal employee={showDeleteModal} close={() => setShowDeleteModal(null)} />
      <EditEmployeeModal mode='update' employee={showEditModal} close={() => setShowEditModal(null)} />
    </Container>
  );
}

export default Employees;
