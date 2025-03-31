import React, { useState, useEffect } from "react";

//create a post to automatically post username

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const CheckboxWithLineThrough = (index) => {
    const newTasks = [...tasks];
    newTasks[index].is_done = !newTasks[index].is_done;
    setTasks(newTasks);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let getResponse = await fetch(
      "https://playground.4geeks.com/todo/users/jdiaz23"
    );
    let data = await getResponse.json();
    setTasks(data.todos);
    console.log(data.details);

    if (data.details == undefined) {
      let response = await fetch(
        "https://playground.4geeks.com/todo/users/jdiaz23",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
        }
      );
    }
  };

  const addToDo = async () => {
    let response = await fetch(
      "https://playground.4geeks.com/todo/todos/jdiaz23",
      {
        method: "POST",
        body: JSON.stringify({
          label: userInput,
          is_done: false,
        }),
        headers: { "Content-type": "application/json" },
      }
    );
    let data = await response.json();
    console.log("here is my data", data);
    getUser();
  };

  const removeTask = async (id) => {
    let task = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    // let data = await task.json()
    getUser();
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.label);
  };

  const updateList = async (id) => {
    let response = await fetch(
      `https://playground.4geeks.com/todo/todos/${id}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          label: editText,
          is_done: false,
        }),
      }
    );
    setEditingId(null);
    setEditText("");
    getUser();
  };

  const keyPressHandler = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      addToDo(event);
    }
  };

  return (
    <div className="container text-center mt-5 h-100">
      <h1>To Do List</h1>

      <input
        type="text"
        placeholder="What needs to be done?"
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(event) => {
          keyPressHandler(event);
        }}
        value={userInput}
      />
      <button onClick={(e) => addToDo(e)}>Update List</button>
      <ul>
        {tasks?.map((task, index) => {
          const isEditing = editingId === task.id;

          return (
            <li
              key={task.id}
              style={{
                textDecoration: task.is_done ? "line-through" : "none",
              }}
            >
              {isEditing ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onBlur={() => updateList(task.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") updateList(task.id);
                  }}
                  autoFocus
                />
              ) : (
                <>
                  {task.label}

                  <input
                    type="checkbox"
                    checked={task.is_done}
                    onChange={() => CheckboxWithLineThrough(index)}
                  />
                  <span onClick={() => removeTask(task.id)} id="redX">
                    {" "}
                    ❌{" "}
                  </span>
                  <span onClick={() => startEditing(task)} id="editPencil">
                    {" "}
                    ✏️{" "}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ul>
      <div className="container taskCounter">
        <span>{tasks.length} item(s) left</span>
      </div>
    </div>
  );
};

export default Home;
