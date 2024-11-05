import { Routes, Route, Navigate } from "react-router-dom";
import Layout from './pages/Layout';
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="h-full w-full dark:bg-black dark:text-white overflow-hidden">
      <Routes>
        <Route path="/u" element={<Layout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<Navigate to="/u/home" />} />
      </Routes>
    </div>
  );
}

export default App;
