import { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";
import { BsFillTrashFill, BsCircleFill } from 'react-icons/bs';

function Home(){
    const[todos,setTodos]=useState([])
    useEffect(()=> {
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    },[])

    const handleEdit = (id)=>{
        axios.put('http://localhost:3001/update/'+id)
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }

    return(
        <div className="home">
            <h1>Todo List</h1>
            <Create/>
            {
                todos.length===0
                ?
                <div><h2>No Records</h2></div>
                :
                todos.map((todo,index)=>(
                    <div className="task_list" key={index}>
                        <div className="checkbox" onClick={()=>handleEdit(todo._id)}>
                            <BsCircleFill className="icon"/>
                            <p>{todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className="icon"/></span>
                        </div>
                        </div>
                ))
            }
        </div>
    )
}
export default Home;