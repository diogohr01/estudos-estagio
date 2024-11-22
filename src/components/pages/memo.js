import { useState, useEffect, useMemo } from "react";


const Memo = () =>{
 const [number, setNumber] = useState(1)
 const [texto, setTexto] = useState('')

 const doubleNumber = useMemo(() => {
      return slowFunction(number)
 }, [number])
      return (
            <>
            <p>{number}</p>
            <input value={texto} onChange={(e) => setTexto(e.target.value)} />
            <button onClick={()=> setNumber(2)}>Increment</button>
            <p>text: {texto}</p>
            </>
            
      )

}
const slowFunction = (num) =>{
      console.log("Slow function is being called")
      for(let i = 0; i < 10000 ; i++){}
      return num * 2
}


export default Memo


