import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/index";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" elemnt={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
