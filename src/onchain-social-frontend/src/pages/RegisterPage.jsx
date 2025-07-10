import "./RegisterPage.css";

function RegisterPage() {
  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-form">
          <h2>Welcome to Onchain Social</h2>

          <p className="register-info-text">
            Onchain Social uses Internet Identity for secure, passwordless login.
            You don’t need to register manually.
          </p>

          <p className="register-info-text">
            Simply click the “Login with Internet Identity” button on the login page.
            If you don't have an identity yet, you can create one there securely.
          </p>

          <a
            href="https://identity.ic0.app"
            target="_blank"
            rel="noopener noreferrer"
            className="register-link"
          >
            Visit Internet Identity Portal
          </a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
