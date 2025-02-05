import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import Titlebar from "./Titlebar";
import { FilledStarIcon, UnfilledStarIcon } from "./icons";

const TASKS = [
  {
    name: 'Gym',
    daysOfWeek: [0, 1, 0, 1, 0, 1, 0],
  }
]

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }
  console.log(greet());

  return (
    <main className="container">
      <Titlebar />
      <h1>Welcome to Tauri + React</h1>
      <p>Task name</p>
      <div>
        {
          TASKS.map((task) => (
            <div>
            <p>{task.name}</p>
            <div className="row">
              {
                task.daysOfWeek.map((day) => (
                  day ? (
                    <FilledStarIcon />
                  ) : (
                    <UnfilledStarIcon />
                  )
                ))
              }
            </div>
            </div>
          ))
        }
      </div>
    </main>
  );
}

export default App;
