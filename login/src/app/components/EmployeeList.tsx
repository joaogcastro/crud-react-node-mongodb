import create from 'zustand';
import EmployeeTable from '../../../pages/EmployeeTable';

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
}


interface EmployeeState {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [
    { id: 1, name: 'Ana Silva', email: 'ana.silva@example.com', phone: '11987654321', age: 28 },
    { id: 2, name: 'Carlos Gomes', email: 'carlos.gomes@example.com', phone: '21987654321', age: 34 },
    { id: 3, name: 'Lucas Martins', email: 'lucas.martins@example.com', phone: '21987654322', age: 30 },
    { id: 4, name: 'Maria Clara', email: 'maria.clara@example.com', phone: '11987654323', age: 25 },
    { id: 5, name: 'João Pedro', email: 'joao.pedro@example.com', phone: '31987654324', age: 40 },
    { id: 6, name: 'Fernanda Lima', email: 'fernanda.lima@example.com', phone: '41987654325', age: 29 },
    { id: 7, name: 'Ricardo Oliveira', email: 'ricardo.oliveira@example.com', phone: '21987654326', age: 35 },
    { id: 8, name: 'Juliana Campos', email: 'juliana.campos@example.com', phone: '11987654327', age: 27 },
    { id: 9, name: 'Roberto Nascimento', email: 'roberto.nascimento@example.com', phone: '31987654328', age: 32 },
    { id: 10, name: 'Patrícia Souza', email: 'patricia.souza@example.com', phone: '41987654329', age: 31 },
    { id: 11, name: 'Marcos Teixeira', email: 'marcos.teixeira@example.com', phone: '21987654330', age: 38 },
    { id: 12, name: 'Larissa Gonçalves', email: 'larissa.goncalves@example.com', phone: '11987654331', age: 22 },
    { id: 13, name: 'Thiago Moraes', email: 'thiago.moraes@example.com', phone: '31987654332', age: 36 },
    { id: 14, name: 'Camila Ribeiro', email: 'camila.ribeiro@example.com', phone: '41987654333', age: 33 }
  ],
  setEmployees: (employees) => set({ employees }),
}));
