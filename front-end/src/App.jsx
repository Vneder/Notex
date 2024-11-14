// import Router from 'react';
import { Header } from "./components/header/Header";
// import { Intro } from "./components/Intro/Intro";
import { Features } from "./components/features/Features";
import { Footer } from "./components/footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Register } from "./components/Register/Register";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
             <Route path="/" element={<Intro />} /> 
            <Route path="/features" element={<Features />} />
            <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

// import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
// import { Header } from "./components/Header/Header";
// import { Intro } from "./components/Intro/Intro";
// import { Features } from "./components/Features/Features";
// import { Footer } from "./components/Footer/Footer";
// import { Login } from "./components/Login/Login";
// import { Register } from "./components/Register/Register"; 
// import "./App.css";

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Header />
//         <main>
//           <Routes>
//             <Route path="/" element={<Intro />} />
//             <Route path="/features" element={<Features />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;
