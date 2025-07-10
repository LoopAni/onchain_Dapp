import "./LoginPage.css";
import { useNavigate } from 'react-router-dom';
import { AuthClient } from "@dfinity/auth-client";

function LoginPage() {
  const navigate = useNavigate();

  const loginWithII = async () => {
    const authClient = await AuthClient.create();

    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toText();
        console.log("Login successful! Principal:", principal);

        // Optional: Store principal in state/localStorage if needed

        navigate("/feed"); // Navigate to feed on success
      },
    });
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form">
          <h2>Login to Onchain Social</h2>

          {/* You can remove email/password if not needed */}
          <button onClick={loginWithII} className="login-button">
            Login with Internet Identity
          </button>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;
