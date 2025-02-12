import { StartChart } from "./components/starchart/StarChart";
import "./App.css";
import { Titlebar } from "./components/titlebar/Titlebar";

function App() {

  return (
    <main className="container">
      <Titlebar />
      <StartChart />
    </main>
  );
}

export default App;
