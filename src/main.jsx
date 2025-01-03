import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx";
import { AuthProvider } from './contexts/AuthContext.jsx';
import MyCard from "./components/Card.jsx";
import Admin from "./components/Admin.jsx";
import Navbar from "./components/Navbar.jsx";

createRoot(document.getElementById('root')).render(
    <>
        <Router>
            <AuthProvider>
            <div>
                <Navbar/>
                <Routes>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/tours" element={<MyCard/>}/>
                     <Route path="/login" element={<Login/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/contact" element={<p>hi3</p>} />
                </Routes>
            </div>
            </AuthProvider>
        </Router>
    </>
)


