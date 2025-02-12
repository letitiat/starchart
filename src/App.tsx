import { useContext } from "react";
import Titlebar from "./Titlebar";
import { Task } from "./components/Task";
import { StarChartContext } from "./providers/StarChartProvider";
import "./App.css";

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

function App() {

  const { tasks } = useContext(StarChartContext);

  console.log(tasks)

  return (
    <main className="container">
      <Titlebar />
      <h1>Silly Little Motivation Chart</h1>
      <div>
        {
          tasks.map((task) => (
            <Task task={task} key={task.taskName} />
          ))
        }
      </div>
    </main>
  );
}

export default App;
