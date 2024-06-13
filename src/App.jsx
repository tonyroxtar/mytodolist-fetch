import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import Input from "./components/input";
import Tasks from "./components/tasks";

const API_BASE_URL = "https://playground.4geeks.com/todo";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [userExists, setUserExists] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      const newTask = { label: input, done: false };
      createTask(newTask);
      setInput("");
    }
  };

  const handleOnClick = (index) => {
    const taskToDelete = tasks[index];
    deleteTask(taskToDelete.id);
    setTasks(tasks.filter((task, currentIndex) => index !== currentIndex));
  };

  const handleOnHover = (index) => {
    setHoveredTask(index === hoveredTask ? null : index);
  };

  const createTask = (task) => {
    fetch (`${API_BASE_URL}/todos/tonyroxtar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
    .then ((response) => response.json())
    .then ((data) => {
      console.log(data);
      setTasks([...tasks, { ...task, id: data.id }]);
      toast("Task created");
    })
    .catch((error) => {
      console.error("Error creating task:", error);
    });
  };
  
  const updateTask = (taskId, updateTask) => {
    fetch(`${API_BASE_URL}/todos/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateTask),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setTasks(tasks.map((task) => (task.id === taskId ? updateTask : task)));
      toast("Task updated");
    })
    .catch((error) => {
      console.error("Error updating task:", error);
    });
  };

  const deleteTask = (taskId) => {
    fetch(`${API_BASE_URL}/todos/${taskId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          const error = text ? JSON.parse(text) : { detail: [{ msg: "Unknown error ocurred"}] };
          throw new Error(error.detail.map(err => err.msg).join(", "));
        });
      }
      return response.text();
    })
    .then((text) => {
      console.log(text);
      setTasks(tasks.filter((task) => task.id !== taskId));
      toast("Task deleted");
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
    });
  };
        
const handleStartList = () => {
  if (userExists) {
    return;
  }

  fetch(`${API_BASE_URL}/users/tonyroxtar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          toast("User created");
          setUserExists(true);
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    };

  const handleFinishList = () => {
    fetch(`${API_BASE_URL}/users/tonyroxtar`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if(!response.ok) {
        return response.text().then((text) => {
          const error = text ? JSON.parse(text) : { detail: [{ msg: "Unknown error ocurred"}] };
          throw new Error(error.detail.map(err => err.msg).join(", "));
        });
      }
      return response.text();
    })
    .then((text) => {
      console.log(text);
      toast("User deleted");
      setUserExists(false);
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    })
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/users/tonyroxtar`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.map((task, index) => ({ ...task, id: index })));
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container d-flex">
        <div className="h1Container">
          <h1 className="title">
            <i className="fa-solid fa-rectangle-list"></i> mytodolist
          </h1>
        </div>
        <div className="inputContainer">
          <Input
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            input={input}
          />
        </div>
        <div className="tasksContainer">
          <Tasks
            handleOnClick={handleOnClick}
            handleOnHover={handleOnHover}
            hoveredTask={hoveredTask}
            tasks={tasks}
          />
        </div>
        <div className="buttonContainer">
          <button
            type="button"
            className="btn-lg"
            onClick={handleStartList}
            disabled={userExists}
          >
            start list
          </button>
          <button type="button" className="btn-lg" onClick={handleFinishList}>
            finish list
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
