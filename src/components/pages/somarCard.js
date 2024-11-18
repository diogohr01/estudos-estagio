import React, { useEffect, useState, useMemo } from "react";
import Modal from "./modal";


const frutas = ["maçã", "banana", "laranja", "uva", "manga", "melancia", "morango", "abacaxi", "kiwi", "pêssego"];


function Cards() {
      const [formData, setFormdata] = useState({
            name: "",
            valor: "",
      })
      const [quantities, setQuantities] = useState({})
      const [produtos, setProdutos] = useState([])
      const [produtosFinalizados, setProdutosFinalizados] = useState([])
      const [active, setActive] = useState(false)
      const [newQuantitie, setNewQuantitie] = useState('')
      const [idQuantidade, SetIdQuantidade] = useState()
      const [openModal, setOpenModal] = useState(false)
      const [search, setSearch] = useState('')

      

      const frutasFiltradas = useMemo(()=>{
            const lowerBusca = search.toLowerCase();
            return frutas.filter(fruta => fruta.toLowerCase().includes(lowerBusca))
      }, [search])



      useEffect(() => {
            const storage = localStorage.getItem('@produtos');
            if (storage) {
                  setProdutos(JSON.parse(storage));
            }
      }, []);

      useEffect(() => {
            localStorage.setItem('@produtos', JSON.stringify(produtos));
      }, [produtos]);




      function handleRegisterChange(event) {
            const { name, value } = event.target;

            setFormdata({
                  ...formData,
                  [name]: value
            })
      }
      function handleSubmit(e) {
            e.preventDefault();
            setProdutos((prev) => [
                  ...prev,
                  formData
            ])
            setFormdata({
                  name: "",
                  valor: ""
            })

      }
      function handleQuantitiesChange(id, qtd) {
            if (quantities[id] !== undefined) {

                  quantities[id] += qtd;
            } else {

                  quantities[id] = qtd;
            }

            setQuantities({
                  ...quantities,
                  [id]: Math.max(0, quantities[id])
            });
      }

      function handleProduct(id) {
            const quantidade = quantities[id];

            if (quantidade !== undefined) {
                  const produto = produtos.find((item, index) => {
                        return index === id
                  })

                  if (produto) {
                        const produtoComQuantidade = {
                              ...produto,
                              quantity: quantidade
                        }

                        setProdutosFinalizados(prevProdutos => [
                              ...prevProdutos,
                              produtoComQuantidade
                        ]);
                  } else {
                        console.log("não achou")
                  }
            }
      }

      function changesQuantity(id) {
            setActive(true)
            const produtoId = produtosFinalizados.findIndex((item, index) => { return index === id })
            SetIdQuantidade(produtoId)
            console.log(idQuantidade)
      }

      function handleChangeQuantity(event) {
            const { value } = event.target
            if(value.trim() !== ''){
                  setNewQuantitie(value);
            }
      }

      function handleSubmitQuantity(e) {
            e.preventDefault();
            produtosFinalizados.forEach((item, index) => {
                  if (index === idQuantidade && newQuantitie.trim() !== '') {
                        item.quantity = newQuantitie
                  }
            })
            setActive(false)
            setNewQuantitie('')
      }


      return (

            <div>
                  <form onSubmit={handleSubmit}>
                        <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleRegisterChange}
                              placeholder="Nome"
                        />

                        <input
                              type="text"
                              name="valor"
                              value={formData.valor}
                              onChange={handleRegisterChange}
                              placeholder="valor"
                        />
                        <button type="submit">Cadastrar</button>
                  </form>

                  <div>
                        {produtos.map((item, index) => (
                              <div key={index}>
                                    {item.name}<br/>
                                    {item.valor}<br/>
                                    <button onClick={() => handleQuantitiesChange(index, -1)}>  Diminuir</button>
                                    {quantities[index] || 0}
                                    <button onClick={() => handleQuantitiesChange(index, 1)}>  Aumentar</button>
                                    <button onClick={() => handleProduct(index)}>Finalizar</button>
                              </div>
                        ))}

                  </div>
                  <div>
                        {produtosFinalizados.map((item, index) => (
                              <div key={index}>
                                    nome: {item.name}<br />
                                    preço: {item.valor}<br />
                                    quantidade: {item.quantity} <button onClick={() => changesQuantity(index)}>Editar</button><br />
                                    
                              </div>
                        ))}
                        {active ? (
                                          <form onSubmit={handleSubmitQuantity}>
                                                <input
                                                      type="text"
                                                      name="quantidade"
                                                      value={newQuantitie}
                                                      onChange={handleChangeQuantity}
                                                      placeholder="editar a quantidade"
                                                />
                                                <button type="submit">Editar</button>
                                          </form>
                                    ) : (
                                          <span></span>
                                    )}    

                  </div>
                  <button onClick={() => setOpenModal(true)}>abrir</button>
                  <Modal isOpen={openModal}>
                            <button onClick={() => setOpenModal(!openModal)} >fechar</button>             
                  </Modal><br/><br/>
            <input type="text" onChange={(e) => setSearch(e.target.value)}></input>
            {frutasFiltradas.map((item, index) => (
                  <li key={item}>{item}</li>
            ))}
            </div>

      )
}

export default Cards


