const Tasks = ({ tasks, handleOnClick, handleOnHover, hoveredTask }) => {
  return (
    <>
      <div className="tasksContainer">
        {tasks?.length > 0
          ? tasks.map((tasks, index) => {
              return (
                <p
                  key={index}
                  onMouseEnter={() => handleOnHover(index)}
                  onMouseLeave={() => handleOnHover(null)}
                >
                  {tasks.label}{" "}
                  {index === hoveredTask && (
                    <i
                      className="fa-regular fa-trash-can float-end"
                      onClick={() => handleOnClick(index)}
                    ></i>
                  )}
                </p>
              );
            })
          : "No tasks so far, add one!"}
      </div>
      <p className="tasksRemaining">
        <i className="fa-regular fa-rectangle-list"></i> You have {tasks?.length}{" "}
        tasks left
      </p>
    </>
  );
};

export default Tasks;
