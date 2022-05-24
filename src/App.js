import './App.css';

import {useState, UseEffect, useEffect} from "react";
import{BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState("");
  const [loading, setLoading] = useState(false);

  // Load todos on load page

  useEffect(() => {

    const loadData = async() => {

      setLoading(true)

      const res = await fetch(API + "/todos")
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));

      setLoading(false);

      setTodos(res);

    };

    loadData();

  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false,
    };

    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((prevState) => [...prevState, todo]);

    setTitle("");
    setTime("");
  };

  return (
    <div className="App">
      <div className="todo-header">
        <h1>React ToDo App</h1>
      </div>
      <div className="form-todo">
        <h3>Add new task:</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Task's title"
              onChange={(event) => setTitle(event.target.value)}
              value={title || ""}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="time">Duration</label>
            <input
              type="text"
              name="time"
              placeholder="In hours"
              onChange={(event) => setTime(event.target.value)}
              value={time || ""}
              required
            />
          </div>
          <input type="submit" value="Add Task" />
        </form>
      </div>
      <div className="list-todo">
        <h3>To do tasks:</h3>
        {todos.length === 0 && <p>No tasks to do</p>}
        {todos.map((el) => (
          <div className="todo" key={el.id}>
            <p>{el.title}</p>
          </div>
        ))}


      </div>
    </div>
  );
};

export default App;
