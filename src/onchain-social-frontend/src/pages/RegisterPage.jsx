import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real use: send data to backend
    navigate("/login"); // After registration, go to login page
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Create Your Account</h2>

          <input type="text" placeholder="Username" className="register-input" required />
          <input type="email" placeholder="Email" className="register-input" required />
          <input type="password" placeholder="Password" className="register-input" required />

          <button type="submit" className="register-button">Register</button>

          <p className="register-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
