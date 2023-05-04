import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import { Journeys } from "./Views/Journeys";
import { Stations } from "./Views/Stations";

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/Journeys" element={<Journeys />} />
        <Route path="/Stations" element={<Stations />} />
        <Route path="/" element={<Journeys />} />
        <Route path="/*" element={<Journeys />} />
      </Routes>
    </Router>
  );
};

export default App;
