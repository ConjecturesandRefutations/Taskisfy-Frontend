import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import { AuthProviderWrapper } from "./context/auth.context";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IsPrivate><TaskList /></IsPrivate>} />
        <Route path="/Login" element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="/Signup" element={<IsAnon><SignupPage /></IsAnon>} />
      </Routes>
    </Router>
  );
}

export default App;
