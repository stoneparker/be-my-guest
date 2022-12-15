import { useState, useMemo, useCallback, useEffect } from 'react';

import { Mail, Call, Info, Delete, Edit } from 'styled-icons/material-rounded';

import Header from '../../components/Header';
import Button from '../../components/Button';
import H1 from '../../components/H1';
import DeleteModal from '../../components/DeleteModal';
import EditEmployeeModal from '../../components/EditEmployeeModal';

import { Employee as IEmployee } from '../../types/employee';

import { Container, Main, Table, Employee, Contacts, Units, Salary, Actions } from './styles';
import { api } from '../../services/server';

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
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);

  const [employees, setEmployees] = useState<IEmployee[]>([]); 

  async function getEmployees() {
    try {
      const response = await api.get('/hotelaria/demo/employee');
      setEmployees(response.data);
    } catch (e) {
      console.error(e);
      setEmployees([employee, employee]);
    }
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <Container>
      <Header/>
      <Main>
        <header>
          <H1>Funcionários</H1>
          <Button onClick={() => setShowEditModal(true)}>Adicionar funcionários</Button>
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
            { employees.map((employee: IEmployee) => (
              <tr>
                <td>
                  <Employee>
                    <p>{employee.firstName + employee.lastName}</p>
                    <span>Supervisor de reservas</span>
                  </Employee>
                </td>
                <td>{employee.cpf}</td>
                <td>
                  <Contacts>
                    <p>
                      <Mail size={21} color='#C3C3C3' />
                      {employee.email}
                    </p>
                    <p>
                      <Call size={21} color='#C3C3C3' />
                      {employee.phoneNumber}
                    </p>
                  </Contacts>
                </td>	
                <td>{employee.address}</td>
                <td>
                  <Units>
                    <span>Recife - PE</span>
                    <span>São Luís - MA</span>
                  </Units>
                </td>
                <td>
                  <Salary>
                    R$ {employee.salary + employee.vr + employee.vt}
                    <Info size={18} color='#C3C3C3'/>
                  </Salary>
                </td>
                <td>
                  <Actions>
                    <button onClick={() => { setShowEditModal(true); setSelectedEmployee(employee) }}>
                      <Edit size={24} color='#575757'/>
                    </button>

                    <button onClick={() => setShowDeleteModal(employee)}>
                      <Delete size={24} color='#575757'/>
                    </button>
                  </Actions>
                </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </Main>

      <DeleteModal employee={showDeleteModal} close={() => setShowDeleteModal(null)} />

      <EditEmployeeModal
        employee={selectedEmployee}
        open={showEditModal}
        close={() => { setShowEditModal(false); setSelectedEmployee(null) }}
      />
    </Container>
  );
}

export default Employees;
