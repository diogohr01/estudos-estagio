import { useEffect, useState } from "react";
import styles from "./Home.module.css"


function Home() {
      const [tarefas, setTarefas] = useState([])
      const [input, setInput] = useState("")
      const [tarefasFinalizadas, setTarefasFinalizadas] = useState([])
      

      useEffect(() => {
            const storage = localStorage.getItem("@tarefas")
            setTarefas(JSON.parse(storage))
            const storageValue = localStorage.getItem("@tarefasFinalizadas")
            setTarefasFinalizadas(JSON.parse(storageValue))

      }, [])

      useEffect(() => {
            localStorage.setItem("@tarefas", JSON.stringify(tarefas))

      }, [tarefas])

      useEffect(() => {
            localStorage.setItem("@tarefasFinalizadas", JSON.stringify(tarefasFinalizadas))

      }, [tarefasFinalizadas])


      function handleRegister(e) {
            e.preventDefault();
            if (input.trim() !== '') {
                  setTarefas([...tarefas, input]);
                  setInput('');
            }
      }
      function Finalizado(index) {
            setTarefasFinalizadas((tarefasFinalizadas)=>[
                  ...tarefasFinalizadas,
                  tarefas[index]
            ])
            const novasTarefas = [...tarefas]; 
            novasTarefas.splice(index, 1); 
            setTarefas(novasTarefas); 
        }
      
      function apagarTodos(){
            const apagar = []
            setTarefasFinalizadas(apagar)
        }
      function retornar(index){
            setTarefas((tarefinhas) =>[
                  ...tarefinhas,
                  tarefasFinalizadas[index]
            ])
            const novaTarefaFinalizada = [...tarefasFinalizadas];
            novaTarefaFinalizada.splice(index, 1);

            setTarefasFinalizadas(novaTarefaFinalizada)
      }


      return (
            <>
                  <form onSubmit={handleRegister}>
                        <label>Tarefas</label>
                        <input placeholder="Digite sua nova tarefa" type="text" onChange={(e) => { setInput(e.target.value) }} />
                        <button>Criar</button>
                  </form>
                  Tarefas:
                  {tarefas && tarefas.length > 0 ? (
                        tarefas.map((item, index) => (
                              <div> 
                              <h1 key={index} >{index} - {item}</h1>
                              <button onClick={()=> Finalizado(index)}>Finalizar</button>
                              </div>
                        ))
                  ) : (
                        <h1>Nenhuma tarefa encontrada</h1>
                  )}
                  Tarefas finalizadas:
                  {tarefasFinalizadas && tarefasFinalizadas.length > 0 ?(
                        tarefasFinalizadas.map((item, index) =>(
                              <div>
                              <h1 key={index} >{index} - {item}</h1>
                              <button onClick={()=> retornar(index)}>Retornar as tarefas</button><br/>
                              </div>
                        ))
                  ): (
                        <h1>Nenhhuma finalizada</h1>
                  )}<br/>
                  <button onClick={()=>{apagarTodos()}}> Apagar todos os finalizados </button>

            </>
      )
}

export default Home;