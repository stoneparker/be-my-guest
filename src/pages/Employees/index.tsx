import { useState, useEffect } from 'react';

import { Info, Delete, Edit } from 'styled-icons/material-rounded';

import Header from '../../components/Header';
import Button from '../../components/Button';
import H1 from '../../components/H1';
import DeleteModal from '../../components/DeleteModal';
import EditEmployeeModal from '../../components/EditEmployeeModal';

import { EmployeeList } from '../../types';

import { Container, Main, Table, Employee, Contacts, Units, Salary, Actions } from './styles';
import { api } from '../../services/server';

const Employees: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<EmployeeList | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeList | null>(null);

  const [employees, setEmployees] = useState<EmployeeList[]>([]); 

  async function getEmployees() {
    try {
      const response = await api.get('/employee');
      console.log(JSON.parse(response.data));
      setEmployees(JSON.parse(response.data));
    } catch (e) {
      console.error(e);
      alert('Algo deu errado, tente novamente.')
    }
  }

  function closeEditModal() {
    setShowEditModal(false)
    setSelectedEmployee(null);
    getEmployees();
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
              <th scope='col'>Contrato</th>
              <th scope='col'>CPF Supervisor</th>
              <th scope='col'>Unidades</th>
              <th scope='col'>Remuneração</th>
              <th scope='col'>Ações</th>
            </tr>
          </thead>
          <tbody>
            { employees.map((item: EmployeeList) => (
              <tr key={item.employee.cpf}>
                <td>
                  <Employee>
                    <p>{item.employee.namFirstName} {item.employee.namLastName}</p>
                    <span>{item.roles.role_name}</span>
                  </Employee>
                </td>
                <td>{item.employee.cpf}</td>
                <td>{item.employee.contract_type}</td>
                <td>{item.employee.idSup}</td>
                <td>
                  <Units>
                    { item.unitList.map((unit) => (
                      <span key={unit.cnpj}>{unit.tradeMark}</span>
                    ) ) }
                  </Units>
                </td>
                <td>
                  <Salary>
                    R$ {item.employee.salary + item.employee.vr + item.employee.vt + item.healthPlan.pricePerEmployee}
                    <Info size={18} color='#C3C3C3'/>
                  </Salary>
                </td>
                <td>
                  <Actions>
                    <button onClick={() => { setShowEditModal(true); setSelectedEmployee(item) }}>
                      <Edit size={24} color='#575757'/>
                    </button>

                    <button onClick={() => setShowDeleteModal(item)}>
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
        close={closeEditModal}
        employeesList={employees}
      />
    </Container>
  );
}

export default Employees;
