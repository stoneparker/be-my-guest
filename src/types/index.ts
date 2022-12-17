export interface Employee {
  cpf: number,
  contract_type: string,
  vr: number,
  vt: number,
  salary: number,
  namFirstName: string,
  namLastName: string,
  idHea: number,
  idRol: number,
  idSup: number,
}

export interface HealthPlan {
  idHea: string,
  healthPlanName: string,
  pricePerEmployee: string,
  idIns: string,
}

export interface Role {
  id_rol: number,
  role_name: string,
  role_description: string,
}

export interface Unit {
  tradeMark: string,
  cnpj: number,
  area: number,
  category: string,
  sector: string,
  locState: string,
  locCountry: string,
  locStreet: string,
  locCity: string,
}

export interface EmployeeList {
  employee: Employee,
  healthPlan: HealthPlan,
  roles: Role,
  unitList: Unit[],
}
