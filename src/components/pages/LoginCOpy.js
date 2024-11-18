import React, { useEffect, useState } from "react";

function Teste() {
      const [formData, setFormdata] = useState({
            name: '',
            senha: '',
            email: ''
      });
      const [cadastros, setCadastros] = useState([]);
      const [editar, setEditar] = useState(false)

      useEffect(() => {
            const storage = localStorage.getItem('@formulario');
            if (storage) {
                  setCadastros(JSON.parse(storage));
            }
      }, []);

      useEffect(() => {
            localStorage.setItem('@formulario', JSON.stringify(cadastros));
      }, [cadastros]);

      function handleRegisterChange(event) {
            const { name, value } = event.target;

            setFormdata({
                  ...formData,
                  [name]: value
            });
            
      }

      function handleFormSubmit(event) {
            event.preventDefault();
            setCadastros((cadastros)=>[
                  ...cadastros,
                  formData
            ]);
            
            setFormdata({
                  name: '',
                  senha: '',
                  email: ''
            });
            
      }
      console.log(cadastros)
      function finalizado(index){
            const novaLista = [...cadastros]
            novaLista.splice(index, 1)
            setCadastros(novaLista)
      }
      

      return (
            <>
            <form onSubmit={handleFormSubmit}>
                  <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleRegisterChange} 
                        placeholder="Nome"
                  />
                  <input 
                        type="password" 
                        name="senha" 
                        value={formData.senha} 
                        onChange={handleRegisterChange} 
                        placeholder="Senha"
                  />
                  <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleRegisterChange} 
                        placeholder="Email"
                  />
                  <button type="submit">Cadastrar</button>
            </form>

            {cadastros.map((item, index) => (
                  <div key={index}>
                        {item.name}<br/>
                        {item.senha}<br/>
                        {item.email}<br/> 
                        <button onClick={()=> finalizado(index)}> finalizar</button>
                  
                  </div>
                  
            ))}
            </>


      );
}

export default Teste;
