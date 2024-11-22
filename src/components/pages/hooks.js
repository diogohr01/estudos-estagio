import { useState, useEffect } from "react";


const Hooks = () =>{
      const [resourceType , setResourceType] = useState('posts')
      const [items, setItems] = useState([])

      useEffect(() =>{
            const fetchResourceTypes = async () =>{
            const response = await fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
            const responseJSON = await response.json()
            console.log(responseJSON)
                  setItems(responseJSON)

            }
             //fetchResourceTypes()
      }, [resourceType])

      useEffect(() =>{
            console.log('componentDidMount')
            return () =>{
                  console.log('componentWillUnmount')
            }
      }, [])
      


      const changeResourceType = (resourceType) =>{
            setResourceType(resourceType);
      }
      return (

            <div>
                  <h1>{resourceType}</h1>
                  <div style={{display: "flex", alignItems: "center"}}>
                        <button onClick={() => changeResourceType("posts")}>Posts</button>
                        <button onClick={() => changeResourceType("comments")}>Comments</button>
                        <button onClick={() => changeResourceType("todos")}>todos</button>

                  </div>
                  {items.map((item) => (
                        <p>{item.id}</p>
                  ))}
            </div>
      )
}

export default Hooks


