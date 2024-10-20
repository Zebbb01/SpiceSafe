import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login/Login';
import Signup from './components/SignUp/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import './App.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const logout = () => {
    setUser(null); // Clear the user on logout
  };

  return (
    <div className="App">
      <header className="App-header">
        {!user ? (
          <>
            {isLogin ? <Login setUser={setUser} /> : <Signup setIsLogin={setIsLogin} />}
            <span className="toggle-span" onClick={toggleForm}>
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </span>
          </>
        ) : (
          <Dashboard user={user} logout={logout} />
        )}
      </header>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    </div>
  );
}

export default App;
