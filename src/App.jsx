import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "./App.css";
import Input from "./components/input";
import Tasks from "./components/tasks";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [hoveredTask, setHoveredTask] = useState(null);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setTasks([...tasks, input]);
      setInput("");
    }
  };
  const handleOnClick = (index) => {
    setTasks(tasks.filter((task, currentIndex) => index !== currentIndex));
  };
  const handleOnHover = (index) => {
    setHoveredTask(index === hoveredTask ? null : index);
  };

  return (
    <>
      <div className="container d-flex">
        <div className="h1Container">
          <h1 className="title">
            <i class="fa-solid fa-rectangle-list"></i> mytodolist
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
      </div>
    </>
  );
}

export default App;
