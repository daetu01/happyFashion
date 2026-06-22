import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AuraProvider } from "./lib/AuraContext";
import { AuthProvider } from "./lib/AuthContext";
import BackgroundFX from "./components/BackgroundFX";
import Landing from "./pages/Landing";
import Upload from "./pages/Upload";
import Analysis from "./pages/Analysis";
import Results from "./pages/Results";
import Share from "./pages/Share";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Library from "./pages/Library";
import PlaylistDetail from "./pages/PlaylistDetail";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/results" element={<Results />} />
          <Route path="/share" element={<Share />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/playlists/:playlistId" element={<PlaylistDetail />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuraProvider>
          <BackgroundFX />
          <AnimatedRoutes />
        </AuraProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
