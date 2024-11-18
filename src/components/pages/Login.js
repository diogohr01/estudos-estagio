import React, { useEffect, useState } from 'react';

function Formulario() {
      const [formData, setFormData] = useState({
            name: '',
            email: '',
            senha: ''
      });
      const [cadastros, setCadastros] = useState([]);

      useEffect(() => {
            localStorage.setItem("@formulario", JSON.stringify(cadastros));
      }, [cadastros]);

      useEffect(() => {
            
            const storage = localStorage.getItem("@formulario");
            if (storage) {
                  setCadastros(JSON.parse(storage));
            }
      }, []);

      function handleRegisterChange(event) {
            const { name, value } = event.target;
            setFormData({
                  ...formData,
                  [name]: value
            });
      }

      function handleFormSubmit(event) {
            event.preventDefault();
            setCadastros([...cadastros, formData]); 
            setFormData({ name: '', email: '', senha: '' });
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
                              type="email" 
                              name="email" 
                              value={formData.email} 
                              onChange={handleRegisterChange} 
                              placeholder="Email" 
                        />
                        <input 
                              type="password" 
                              name="senha" 
                              value={formData.senha} 
                              onChange={handleRegisterChange} 
                              placeholder="Senha" 
                        />
                        <button type="submit">Cadastrar</button>
                  </form>
                  
                  <h2>Cadastros:</h2>
                  {cadastros.map((item, index) => (
                        <div key={index}>
                              <p>Nome: {item.name}</p>
                              <p>Email: {item.email}</p>
                              <p>Senha: {item.senha}</p>
                        </div>
                  ))}
            </>
      );
}

export default Formulario;
