import React from 'react';
import BackButton from '@/app/components/BackButton';
import { useEmployeeStore } from "../src/app/components/EmployeeList"
import styles from '../src/app/components/Employee.module.css';

const EmployeeTable: React.FC = () => {
  const { employees } = useEmployeeStore();

  return (
    <div className={styles.tableContainer}>
      <div><h1>Lista de Funcionários</h1></div>
      <div className="back-button-container">
        <BackButton />
      </div>
      <table className={styles.employeeTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Idade</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;