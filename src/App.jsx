import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Preloader from "./Components/Preloader"; // Import Preloader Component
import "./App.css";

const App = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Set a timer to show content after 3 seconds
    setTimeout(() => {
      setShowContent(true);
    }, 3000);
  }, []);

  return (
    <div className="app-container">
      {/* Preloader */}
      {!showContent && <Preloader />}

      {/* Main Content */}
      {showContent && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </>
      )}

      {/* Footer - Always displayed once content is loaded */}
      {/* {showContent && <Footer />} */}
    </div>
  );
};

export default App;
