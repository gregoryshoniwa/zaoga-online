import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { NoPage } from "./pages/NoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="home" element={<Dashboard />}></Route>
      <Route path="*" element={<NoPage />}></Route>
    </Routes>
  );
}

export default App;
