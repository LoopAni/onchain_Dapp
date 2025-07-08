import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Welcome to Onchain Social</h1>
        <p>Decentralized. Secure. Yours.</p>
        <div className="landing-buttons">
          <a href="/login" className="btn">Login</a>
          <a href="/register" className="btn">Register</a>
        </div>
      </header>
    </div>
  );
}

export default LandingPage;
