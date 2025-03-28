import React, { useState, useEffect } from "react";


//create a post to automatically post username

const Home = () => {

	const [tasks, setTasks ] = useState([]);
	const [userInput, setUserInput] = useState("");
	
useEffect ( () => {
	getUser() 
} ,[])

const getUser = async () =>{
	let getResponse = await fetch("https://playground.4geeks.com/todo/users/jdiaz23")
	let data = await getResponse.json()
	setTasks(data.todos)
}

const addToDo = async () => {

		let response = await fetch("https://playground.4geeks.com/todo/todos/jdiaz23", {
		method: "POST",
		body: JSON.stringify({ 
			label: userInput,
			is_done: false }),
		headers: { "Content-type": "application/json" },
	})
	let data = await response.json()
	console.log("here is my data", data)
	getUser()
	return data;
}

const removeTask = async (id) => {
	 let task = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
		method: "Delete",
		headers: { "Content-type": "application/json" },
	})
	// let data = await task.json()
	getUser()
	return task;
}

const keyPressHandler = (event) => {
   console.log(event.key)
	if (event.key === "Enter") {
        addToDo(event);
    }
   };

	return (
			
		<div className="container text-center mt-5 h-100">
			<h1>To Do List</h1>
			
			<input type="text" placeholder="What needs to be done?"
			onChange={(e) => setUserInput(e.target.value)} 
			onKeyDown={(event) =>{keyPressHandler(event)} }
			value={userInput}
			
			/>
            <button onClick={ (e) => addToDo(e)}>Update List</button>
			<ul>
				{tasks?.map((task,index) => {
					if (task !=true) {
						return (<li key={index}>{task.label}<span onClick={() =>removeTask(task.id)} id="redX"> ❌ </span> </li>)
					}
				})}
			</ul>
			<div className="container taskCounter"><span>{tasks.length} item(s) left</span></div>
		</div>
	);
};

export default Home;