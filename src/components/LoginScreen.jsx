import React, { useState } from "react";



const LoginScreen = ({ onLogin, allUsers }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    
    const foundUser = allUsers.find(
      (user) => user.username === username && user.password === password
    );

    
    if (foundUser) {
      onLogin(foundUser);
      return;
    }

    
    setError("Invalid username or password.");
  };

 
  return (
    <div className="container login-container">
      <header className="login-header text-center">
        <h1>🎓 Remote Classroom</h1>
      </header>

      <div className="card login-card p-4">
        <form onSubmit={handleSubmit}>
          <h2 className="h4 mb-4 text-center text-dark">Login to your account</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Login
            </button>
          </div>
        </form>
      </div>

      
      <div className="alert demo-info mt-4">
        <h5 className="alert-heading">Demo Logins (10 Teachers, 10 Students):</h5>
        <hr />
        <p className="mb-1">
          <b>Teacher 1:</b> <code>priya@sharma</code> / <code>priya123</code>
        </p>
        <p className="mb-1">
          <b>Teacher 6:</b> <code>raj@singh</code> / <code>raj123</code>
        </p>
        <p className="mb-1">
          <b>Student:</b> <code>Rohan@kumar</code> / <code>Rohan123</code>
        </p>
        <p className="mb-0">
          <b>Student 6:</b> <code>Aditi@Singh</code> / <code>Aditi123</code>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;