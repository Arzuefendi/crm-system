import React, { useEffect, useState } from "react";
import { MdOutlineMailOutline, MdLockOutline } from "react-icons/md";
import "../style/Login.css";
import { useNavigate } from "react-router-dom";
const Login = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userData = { email: "admin@gmail.com", password: "123456" };
    localStorage.setItem("userData", JSON.stringify(userData));
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email boş buraxıla bilməz!";
    }

    if (!password) {
      newErrors.password = "Şifrə boş buraxıla bilməz!";
    } else if (password.length < 6) {
      newErrors.password = "Şifrə 6 simvoldan az olmamalıdır";
    }

    if (Object.keys(newErrors).length === 0) {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      if (
        storedUserData &&
        storedUserData.email === email &&
        storedUserData.password === password
      ) {
        onLogin();
        navigate("/user");
      } else {
        newErrors.email = "Email və ya şifrə yanlışdır";
      }
    }
    setErrors(newErrors);
  };
  return (
    <div className="login-box">
      <form onSubmit={handleLogin}>
        <h5>
          <span>CRM</span> <span>Agent</span>
        </h5>
        <div className="form-floating">
          <MdOutlineMailOutline className="icon" />
          <input
            type="email"
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-floating">
          <MdLockOutline className="icon" />
          <input
            type="password"
            placeholder="123456"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button className="my-4" type="submit">
          Daxil olun
        </button>
      </form>
    </div>
  );
};

export default Login;
