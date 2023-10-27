import { Toaster } from "react-hot-toast";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import {
  Login,
  Register
} from "./Components/Pages/Auth";
import Navbar from "./Components/Pages/Header/Navbar";
import Home from "./Components/Pages/Home";
import AuthProvider from "./ContextApi";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Toaster />
        <Routes>
          <Route exact path="/signin" element={<Login />} />
          <Route exact path="/signup" element={<Register />} />
          <Route exact path="/" element={
              <Home />
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
