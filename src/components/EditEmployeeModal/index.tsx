import { useEffect, useRef, useState, Ref } from 'react';

import Button from '../../components/Button';
import H1 from '../../components/H1';
import Input from '../../components/Input';
import Select from '../../components/Select';

import { api } from '../../services/server';

import { Employee, EmployeeList, HealthPlan, Role, Unit } from '../../types';

import { Container, Form, InputRow } from './styles';

const contractTypes = [
  { value: 'CLT', label: 'CLT' },
  { value: 'PJ', label: 'PJ' },
]

interface EditEmployeeModalProps {
  employee: EmployeeList | null;
  close: () => void;
  open: boolean;
  employeesList: EmployeeList[];
}

const newEmployee: Employee = {
  cpf: 0,
  namFirstName: '',
  namLastName: '',
  salary: 0,
  vr: 0,
  vt: 0,
  idHea: 0,
  idRol: 0,
  idSup: 0,
  contract_type: 'CLT',
}

interface SelectProps {
  value: string,
  label: string,
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ employee, close, open, employeesList }) => {
  const [values, setValues] = useState<Employee>(newEmployee);

  const [unitsOptions, setUnitsOptions] = useState<SelectProps[]>([]);
  const [rolesOptions, setRolesOptions] = useState<SelectProps[]>([]);
  const [healthPlanOptions, setHealthPlanOptions] = useState<SelectProps[]>([]);
  const [supervisorOptions, setSupervisorOptions] = useState<SelectProps[]>([]);
  
  const [selectedRole, setSelectedRole] = useState<SelectProps | null>(null);
  const [selectedUnits, setSelectedUnits] = useState<SelectProps[]>([]);
  const [selectedContractType, setSelectedContractType] = useState<SelectProps | null>(null);
  const [selectedHealthPlan, setSelectedHealthPlan] = useState<SelectProps | null>(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState<SelectProps | null>(null);

  const modalRef: Ref<HTMLDialogElement> = useRef(null);

  async function handleSubmit() {
    const data: Employee = {
      ...values,
      cpf: Number(values.cpf),
      vr: Number(values.vr),
      vt: Number(values.vt),
      salary: Number(values.salary),
      idHea: Number(selectedHealthPlan?.value),
      idRol: Number(selectedRole?.value),
      contract_type: selectedContractType?.value || 'CLT',
      idSup: Number(selectedSupervisor?.value),
    }

    console.log(data);

    if (employee) {
      await api.put('/employee', data);

      // for (const unit of selectedUnits) {
      //   const worksFor = {
      //     cpf: data.cpf,
      //     cnpj: unit.value,
      //     tradeMark: unit.label,
      //   }

      //   await api.put('/worksFor', worksFor);
      // }
    } else {
      await api.post('/employee', { employee: data });

      for (const unit of selectedUnits) {
        const worksFor = {
          cpf: data.cpf,
          cnpj: unit.value,
          tradeMark: unit.label,
        }

        await api.post('/worksFor', worksFor);
      }
    }

    close();
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.currentTarget.name]: e.target.value });
  }

  async function getUnitsOptions() {
    const response = await api.get('/unity');

    const units = JSON.parse(response.data).map((unit: Unit) => (
      { value: unit.cnpj, label: unit.tradeMark }
    ))

    setUnitsOptions(units);
  }

  async function getRolesOptions() {
    const response = await api.get('/roles');

    const roles = JSON.parse(response.data).map((role: Role) => (
      { value: role.id_rol, label: role.role_name }
    ));

    setRolesOptions(roles);
  }

  async function getHealthPlanOptions() {
    const response = await api.get('/healthPlan');

    const plans = JSON.parse(response.data).map((plan: HealthPlan) => (
      { value: plan.idHea, label: plan.healthPlanName }
    ));

    setHealthPlanOptions(plans);
  }

  async function getSupervisorOptions() {
    const supervisors = (employeesList).map((supervisor: EmployeeList) => (
      { value: supervisor.employee.cpf + '', label: supervisor.employee.cpf + '' }
    ));

    setSupervisorOptions(supervisors);
  }

  useEffect(() => {
    if (open) {
      modalRef.current?.showModal();

      if (employee) {
        setValues(employee.employee);
        setSelectedRole({ value: employee.roles.id_rol + '', label: employee.roles.role_name })

        const units = employee.unitList.map((unit: Unit) => (
          { value: unit.cnpj + '', label: unit.tradeMark }
        ))

        setSelectedUnits(units);
        setSelectedContractType({ value: employee.employee.contract_type, label: employee.employee.contract_type });
        setSelectedHealthPlan({ value: employee.healthPlan.idHea, label: employee.healthPlan.healthPlanName });
        setSelectedSupervisor({ value: employee.employee.idSup + '', label: employee.employee.idSup + '' });
      }

      getUnitsOptions();
      getRolesOptions();
      getHealthPlanOptions();
      getSupervisorOptions();

      return;
    }

    modalRef.current?.close();

    setValues(newEmployee);
    setSelectedContractType(null);
    setSelectedHealthPlan(null);
    setSelectedRole(null);
    setSelectedSupervisor(null);
    setSelectedUnits([]);
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
              id='namFirstName'
              name='namFirstName'
              label='Primeiro nome'
              value={values.namFirstName}
              onChange={onChange}
              required
            />
            <Input
              type='text'
              id='namLastName'
              name='namLastName'
              label='Último nome'
              value={values.namLastName}
              onChange={onChange}
              required
            />
          </InputRow>
          <InputRow>
            <Input
              type='number'
              id='cpf'
              name='cpf'
              label='CPF'
              value={values.cpf || ''}
              onChange={onChange}
              required
            />
          </InputRow>
        </fieldset>
        <fieldset>
          <legend>Trabalho</legend>
          <InputRow>
            <Select
              options={unitsOptions}
              isMulti
              placeholder=''
              label='Unidades'
              value={selectedUnits}
              onChange={(e) => setSelectedUnits(e as SelectProps[])}
            />
          </InputRow>
          <InputRow>
            <Select
              options={rolesOptions}
              placeholder=''
              label='Cargo'
              value={selectedRole}
              onChange={(e) => setSelectedRole(e as SelectProps)}
              required
            />
          </InputRow>
          <InputRow>
            <Select
              options={contractTypes}
              placeholder=''
              label='Tipo de contrato'
              value={selectedContractType}
              onChange={(e) => setSelectedContractType(e as SelectProps)}
              required
            />
            <Select
              options={supervisorOptions}
              placeholder=''
              label='CPF Supervisor'
              value={selectedSupervisor}
              onChange={(e) => setSelectedSupervisor(e as SelectProps)}
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
          <InputRow>
            <Select
              options={healthPlanOptions}
              placeholder=''
              label='Plano de Saúde'
              value={selectedHealthPlan}
              onChange={(e) => setSelectedHealthPlan(e as SelectProps)}
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
