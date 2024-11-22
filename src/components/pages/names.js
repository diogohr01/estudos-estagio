import { useEffect, useState, useRef } from "react"

const Name = () =>{

      const [name, setName] = useState("")

      const previousName = useRef()

      useEffect(() =>{
            previousName.current = name
      },[name])

      return(
            <div>
                  <input  value={name} onChange={(e) => setName(e.target.value)}/> 
                  <p>Hello my name is {name}</p>
                 <p>And my name was {previousName.current}</p>
            </div>
      )
}

export default Name

