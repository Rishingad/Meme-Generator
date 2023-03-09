import "./App.css";
import Home from "./Components/Home.js";
import Form from "./Components/Form.js";
import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import { GameStateContext } from "./Helpers/Context";
import { useContext } from "react";
import useToken from "./Components/useToken";
import Login from "./Components/Login";
import PrivateRoutes from "./Components/routes//PrivateRoutes";
import { GameStateProvider } from "./Helpers/Context";
function App() {
  return (
    <div className="App">
      <GameStateProvider>
          <Router>
            <Routes>
              {/* <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Form />} />
              </Route>
              <Route path="/login" element={<Login />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<Form />} />
            </Routes>
          </Router>
      </GameStateProvider>
    </div>
  );
}

export default App;
