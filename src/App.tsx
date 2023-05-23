import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import { JourneysView } from "./Views/JourneysView";
import { StationsView } from "./Views/StationsView";

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/Journeys" element={<JourneysView />} />
        <Route path="/Stations" element={<StationsView />} />
        <Route path="/" element={<JourneysView />} />
        <Route path="/*" element={<JourneysView />} />
      </Routes>
    </Router>
  );
};

export default App;
