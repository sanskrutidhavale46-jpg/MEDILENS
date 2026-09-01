import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    navigate("/consent");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Profile</h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            required
          />

          <input
            type="date"
            required
          />

          <select required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="tel"
            placeholder="Mobile Number"
            required
          />

          <button type="submit">
            Create Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;