import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Signup from "./pages/Signup/index";
import Account from "./pages/Account/index";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <ToastContainer
          draggablePercent={70}
          hideProgressBar={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
