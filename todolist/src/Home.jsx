import { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";
import { BsFillTrashFill, BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs';

function Home(){
    const[todos,setTodos]=useState([])
    useEffect(()=> {
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    },[])

    const handleEdit = (id)=>{
        const updatedTodos = todos.map(todo =>{
            if (todo._id ===id){
                const updatedTodo= {...todo, done:!todo.done};
                axios.put('http://localhost:3001/update/'+id,updatedTodo)
                .catch(err => console.log(err))
                return updatedTodo;

 }
        return todo;
    });
    setTodos(updatedTodos)};

    const handleDelete = (id) =>{
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result => {
            location.reload()
        })
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
                            {todo.done ?
                            <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                            : <BsCircleFill className="icon"/>
                            }
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className="icon" onClick={() => handleDelete (todo._id)}/></span>
                        </div>
                        </div>
                ))
            }
        </div>
    )
}
export default Home;