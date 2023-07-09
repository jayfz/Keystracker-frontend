import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateProjectPage from "./components/CreateProjectPage";

function Header() {
  return <h1>Header</h1>;
}

function Footer() {
  return <h1>Footer</h1>;
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={"/projects"} />}></Route>
        <Route path="/projects" element={<HomePage />}></Route>
        <Route path="/projects/create" element={<CreateProjectPage />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
