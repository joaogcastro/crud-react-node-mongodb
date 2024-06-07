"use client"
import React, { useState } from 'react';
import axios from 'axios';
import styles from '../components/Login';

interface FormProps {
  email: string;
  phone: string;
}

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormProps>({ email: '', phone: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://seu-backend-endereco.com/api/login', {
        email: formData.email,
        phone: formData.phone
      });
      console.log('Response:', response.data);
      // Você pode adicionar lógica adicional para lidar com a resposta do backend aqui
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // Erros relacionados ao Axios
        if (error.response) {
          // Erro de resposta do servidor
          console.error('Error response:', error.response);
          switch (error.response.status) {
            case 400:
              alert('Requisição inválida. Verifique os dados enviados.');
              break;
            case 401:
              alert('Não autorizado. Verifique suas credenciais.');
              break;
            case 500:
              alert('Erro interno do servidor. Tente novamente mais tarde.');
              break;
            default:
              alert('Ocorreu um erro. Tente novamente.');
          }
        } else if (error.request) {
          // Sem resposta do servidor
          console.error('No response received:', error.request);
          alert('Sem resposta do servidor. Verifique sua conexão com a internet.');
        } else {
          // Outros erros relacionados ao Axios
          console.error('Axios error:', error.message);
          alert('Ocorreu um erro ao fazer a requisição. Tente novamente.');
        }
      } else {
        // Erros não relacionados ao Axios
        console.error('Error:', error);
        alert('Ocorreu um erro inesperado. Tente novamente.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
