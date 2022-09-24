import "./App.css";
import React from "react";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import AnimeFact from "./pages/AnimeFact";
import SpecificFact from "./pages/SpecificFact";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <React.Fragment>
      <React.Fragment>
        <NavigationBar />
        <br />
        <Layout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/animeFact" element={<AnimeFact />} />
              <Route path="/specificFact" element={<SpecificFact />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </BrowserRouter>
        </Layout>
      </React.Fragment>
    </React.Fragment>
  );
}

export default App;
