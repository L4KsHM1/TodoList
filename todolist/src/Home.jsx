import { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";

function Home(){
    const[todos,setTodos]=useState([])
    useEffect(()=> {
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    },[])
    return(
        <div className="home">
            <h1>Todo List</h1>
            <Create/>
            {
                todos.length===0
                ?
                <div><h2>No Records</h2></div>
                :
                todos.map((todo)=>(
                    <div className="task_list">{todo.task}</div>
                ))
            }
        </div>
    )
}
export default Home;