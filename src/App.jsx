import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./Components/ErrorFallback";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import PropertyEditor from "./pages/PropertyEditor";
import Home from "./pages/Home";
import Form from "./pages/Form";
import Builder from "./pages/Builder";
import Submission from "./pages/Submission";

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Router>
        <div className="app-wrapper">
          <Header />
          <div className="content-container">
            <Routes>
              <Route path={"/"} element={<Home />} />
              <Route path={"/propertyeditor"} element={<PropertyEditor />} />
              <Route path={"/form/:id"} element={<Form />} />
              <Route path={"/submission/:id"} element={<Submission />} />
              <Route path={"/builder/:id"} element={<Builder />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
