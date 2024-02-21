import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import LoginForm from './Components/LoginForm'
import RegistrationForm from './Components/RegistrationForm'

export default function App() {
  return (
    <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={ <LandingPage /> } />
                    <Route path="/login" element={ <LoginForm />} />
                    <Route path="/register" element={ <RegistrationForm />} />
                </Routes>
                
            </div>
        </Router>
  );
}