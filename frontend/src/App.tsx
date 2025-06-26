import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import RootLayout from "@/layouts/RootLayout";
import HomePage from "@/pages/HomePage";
import ErrorPage from "@/pages/ErrorPage";
import ProfilePage from "@/pages/ProfilePage";
function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="explore"
              element={
                <div>
                  <h1>Explore</h1>
                  <p>Discover what's happening around the world.</p>
                </div>
              }
            />
            <Route
              path="notifications"
              element={
                <div>
                  <h1>Notifications</h1>
                  <p>Stay updated with your latest notifications.</p>
                </div>
              }
            />
            <Route
              path="messages"
              element={
                <div>
                  <h1>Messages</h1>
                  <p>Your private conversations.</p>
                </div>
              }
            />
            <Route
              path="bookmarks"
              element={
                <div>
                  <h1>Bookmarks</h1>
                  <p>Posts you've saved for later.</p>
                </div>
              }
            />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
