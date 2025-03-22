import React, {useState} from "react";


//create your first component
const Home = () => {

	const [tasks, setTasks ] = useState([]);
	const [userInput, setUserInput] = useState("");
	

const addToDo = (e) => {
	e.preventDefault ();
	let task = {text: userInput, finished : false}
	setTasks([...tasks, task]);
	setUserInput("");
}

const removeTask = (i) => {
	const newArray = tasks.filter((task, index) => index !== i);
	setTasks(newArray)
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
						return (<li key={index}>{task.text}<span onClick={() =>removeTask(index)} id="redX"> ❌ </span> </li>)
					}
				})}
			</ul>
			<div className="container taskCounter"><span>{tasks.length} item(s) left</span></div>
		</div>
	);
};

export default Home;