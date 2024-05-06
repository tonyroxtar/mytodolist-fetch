import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import Input from "./components/input";
import Tasks from "./components/tasks";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [userExists, setUserExists] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const newTask = { label: input, done: false };
      setTasks([...tasks, newTask]);
      setInput("");

      fetch("https://playground.4geeks.com/apis/fake/todos/user/tonyroxtar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([...tasks, newTask]),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("error updating tasks:", error);
        });
    }
  };

  const handleOnClick = (index) => {
    setTasks(tasks.filter((task, currentIndex) => index !== currentIndex));
  };

  const handleOnHover = (index) => {
    setHoveredTask(index === hoveredTask ? null : index);
  };

  

  const handleStartList = () => {
    if (userExists) {
      return;
    }

    const notify = () => toast("user created");

    fetch("https://playground.4geeks.com/apis/fake/todos/user/tonyroxtar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([]),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        notify(data);
        setUserExists(true);
      })
      .catch((error) => {
        console.log("error creating user:", error);
      });
  };

  const handleFinishList = () => {

    const notify = () => toast("user deleted");

    fetch("https://playground.4geeks.com/apis/fake/todos/user/tonyroxtar", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        notify(data);
        setUserExists(false);
      })
      .catch((error) => {
        console.error("failed to delete user", error);
      });
  };

  useEffect(() => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/tonyroxtar", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      fetch("https://playground.4geeks.com/apis/fake/todos/user/tonyroxtar", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tasks),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error updating tasks:", error);
        });
    }
  }, [tasks]);

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
