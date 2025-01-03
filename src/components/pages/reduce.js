import { useState, useEffect, useReducer } from "react";


const reducer = (state, action) =>{
      switch(action.type){
           case "add-task":
            return{
                  tasks: [
                        ...state.tasks, {name: action.nome, preco: action.preco, isCompleted: false}
                  ],
                  tasksCount: state.tasksCount + 1
            }
            case "toggle-task":
                  return {
                        ...state,
                        tasks: state.tasks.map((item, index) => index == action.payload ? {...item, isCompleted: !item.isCompleted} : item)
                  }
            default:
                  return state;
      }
}

const Reduce = () =>{
      const [state, dispatch] = useReducer(reducer, {tasks: [], tasksCount: 0})
      const [nome, setNome] = useState()
      const [preco, setPreco] = useState()
      

      return (
            <div>
                  <input value={nome} onChange={(e) => setNome(e.target.value)}  />
                  <input value={preco} onChange={(e) => setPreco(e.target.value)}  />
                  <button onClick={() => {
                        dispatch({type: 'add-task', nome, preco})
                        setNome("")
                        setPreco("")
                        } }>Adicionar</button><br/>
                  {state.tasksCount}
                  {state.tasks.map((task, index) => (
                  <p onClick={() => dispatch({type: "toggle-task" , payload: index})}
                  style={{textDecoration: task.isCompleted ? 'line-through' : 'none'}}>Nome: {task.name} - Preço: {task.preco}</p>))}
            </div>
            
      )
}

export default Reduce


