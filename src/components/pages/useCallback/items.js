import { useState, useEffect, useMemo} from "react";
import List from "./list";


const Django = () => {
      const [resourceType, setResourceType] = useState('posts')
      const [text, setText] = useState("")
      const [items, setItems] = useState([])
      const [boolean, setBoolean] = useState(false)

      useEffect(() => {
            const getItems = async () => {
                  console.log("getItems is being called!")
                  const response = await fetch(
                        `https://jsonplaceholder.typicode.com/${resourceType}`
                  )
                  const responseJSON = await response.json()
                  setItems(responseJSON)
                  console.log(items)
            }
            getItems()
      }, [resourceType])

      useEffect(() => {
            if (text.trim() !== '') {
                  setBoolean(true)
            }else{
                  setBoolean(false)
            }
      }, [text]);

     const filtro = useMemo(() =>{
            const lowerText = text.toLowerCase()
            return items.filter(item => item?.title ? item.title.toLowerCase().includes(lowerText) : item.name.toLowerCase().includes(lowerText))
           }, [text, items])
      

      return (

            <div>
                  <input value={text} onChange={(e) => setText(e.target.value)} />
                  <div style={{ display: "flex", alignItems: "center" }}>
                        <button onClick={() => setResourceType("posts")}>Posts</button>
                        <button onClick={() => setResourceType("comments")}>Comments</button>
                        <button onClick={() => setResourceType("todos")}>todos</button>

                  </div>
                  {boolean ? (
                        <List getItems={filtro} />
                  ) : <List getItems={items} />}

            </div>
      )
}

export default Django


