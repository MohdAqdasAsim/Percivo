import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" index element={<div>Home</div>} />
      <Route path="/terms-of-service" element={<div>Terms of Service</div>} />
      <Route path="/privacy-policy" element={<div>Privacy Policy</div>} />
    </Routes>
  );
}

export default App;
