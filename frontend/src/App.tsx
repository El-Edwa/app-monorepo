import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import ErrorPage from "@/pages/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
          {/* Add more routes here as you build your app */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
