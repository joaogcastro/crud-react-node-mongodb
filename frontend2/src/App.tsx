import { useEffect, useState, useRef, FormEvent } from 'react';
import { FiTrash } from 'react-icons/fi';
import { api } from './services/api';

interface CustomerProps {
  id: string;
  username: string;
  password: string;
  email: string;
}

export default function App() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const usernameRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const response = await api.get("/user/getAll");
      setCustomers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);
    }
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    if(!usernameRef.current?.value || !emailRef.current?.value) return;

    try {
      const response = await api.post("/user/create", {
        username: usernameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value
      });
      console.log(response.data);
      loadCustomers();
    } catch (error) {
      console.error("Error creating customer:", error);
    }

    usernameRef.current.value = ""
    emailRef.current.value = ""
  }

  async function handleDelete(username: string){
    try{
      await api.delete("/user/delete", {
        params:{
          id: username,
        }
      })

      const allCustomers = customers.filter( (customer) => customer.id !== id)
      setCustomers(allCustomers)

    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2xl">
        <h1 className="text-4x1 font-medium text-white">Usuarios</h1>

        <form className="flex flex-col my-6" onSubmit={handleSubmit}>
          <label className="font-medium text-white">Nome:</label>
          <input type="text" placeholder="Digite seu nome completo..." className="w-full mb-5 p-2 rounded"
          ref={usernameRef} />

          <label className="font-medium text-white">Email:</label>
          <input type="email" placeholder="Digite seu email..." className="w-full mb-5 p-2 rounded"
          ref={emailRef} />

          <label className="font-medium text-white">Senha:</label>
          <input type="password" placeholder="Digite sua senha..." className="w-full mb-5 p-2 rounded"
          ref={passwordRef} />

          <input type="submit" value="Cadastrar" className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium" />
        </form>

        <section className="flex flex-col gap-4">
          {customers.length > 0 ? (
            customers.map((customer) => (
              <article key={customer.id} className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
                <p><span className="font-medium">Nome:</span> {customer.username}</p>
                <p><span className="font-medium">Senha:</span> *********</p>
                <p><span className="font-medium">Email:</span> {customer.email}</p>

                <button className="bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2" onClick={ () => handleDelete(customer.username) }>
                  <FiTrash size={18} color="FFF" />
                </button>
              </article>
            ))
          ) : (
            <p className="text-white">Nenhum cliente encontrado.</p>
          )}
        </section>
      </main>
    </div>
  );
}