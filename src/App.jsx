import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditContactPage from "./pages/EditContactPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditContactPage />} />
      </Routes>
    </Router>
  );
};

export default App;
