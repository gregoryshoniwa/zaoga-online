
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { NoPage } from "./pages/NoPage";


function App() {
  
  return (
    <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Dashboard />}></Route>
          <Route path="*" element={<NoPage />}></Route>
        </Routes>
    </UserContextProvider>
    
  );
}

export default App;
