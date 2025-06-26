import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "@/pages/HomePage";
import ErrorPage from "@/pages/ErrorPage";
import ProfilePage from "@/pages/ProfilePage";
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<ErrorPage />} />
            {/* Add more routes here as you build your app */}
          </Routes>
        </main>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
