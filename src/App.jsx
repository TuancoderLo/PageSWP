import { useState } from "react";
import "./App.css";
import Homepage from "./components/Homepage";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    confirmPassword: "",
  });

  // Thêm mảng tài khoản mẫu
  const validAccounts = [
    {
      email: "user@example.com",
      password: "123456",
    },
    {
      email: "admin@babyhaven.com",
      password: "admin123",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Kiểm tra tài khoản có tồn tại không
      const validUser = validAccounts.find(
        (account) =>
          account.email === formData.email &&
          account.password === formData.password
      );

      if (validUser) {
        setIsLoggedIn(true);
        console.log("Login successful:", formData);
      } else {
        alert("Email hoặc mật khẩu không đúng!");
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Register data:", formData);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFormData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      confirmPassword: "",
    });
  };

  if (isLoggedIn) {
    return <Homepage userEmail={formData.email} onLogout={handleLogout} />;
  }

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-image">
          <img
            src={
              isLogin
                ? "https://www.vietjack.com/tai-lieu-mon-tieng-anh/images/tu-vung-tieng-anh-ve-cac-kieu-gia-dinh-trong-tieng-anh-3461.jpeg"
                : "https://cafefcdn.com/203337114487263232/2022/1/22/shutterstock1486364633-small-1024x683-16428607564401603370314.jpg"
            }
            alt="Family enjoying time together"
          />
        </div>
      </div>

      <div className="auth-right">
        <div className="home-link">
          <i className="fas fa-home"></i>
        </div>
        <div className="auth-box">
          <div className="auth-header">
            <h1>{isLogin ? "Welcome Back" : "Start your journey here"}</h1>
            <p className="header-subtitle">
              {isLogin
                ? "Enter your email address to log in to your BabyHaven account"
                : "Come and discovering new adventures with your little one"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="name-group">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder={
                  isLogin ? "Enter your username" : "Enter your email"
                }
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group phone-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <span className="country-code">+84</span>
              </div>
            )}

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            {isLogin && (
              <div className="form-options">
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLogin ? "Log in" : "Sign up"}
            </button>

            <div className="divider">
              <span>Or</span>
            </div>

            <button type="button" className="social-btn google">
              <i className="fab fa-google"></i>
            </button>

            <div className="toggle-form">
              {isLogin ? "First time visit?" : "Already a member?"}
              <span onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Sign up" : "Log in"}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
