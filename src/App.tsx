
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/home/Dashboard";
import { Login } from "./pages/Login/Login";
import { NoPage } from "./pages/NoPage";

import { UserContextProvider } from "./contexts/UserContext";
import { LoadingContextProvider } from "./contexts/LoadingContext";

import './App.css';

function App() {
  
  return (
    <UserContextProvider>
      <LoadingContextProvider>
        
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/home" element={<Dashboard />}></Route>
            <Route path="*" element={<NoPage />}></Route>
          </Routes>
      </LoadingContextProvider>
    </UserContextProvider>
    
  );
}

export default App;
