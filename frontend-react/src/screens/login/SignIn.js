import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetAuthToken } from "../../globleContext/AuthContext";
import { useUserInfo } from "../../globleContext/UserContext";

import api from "../../utils/axiosInstance";
import { signin } from "../../utils/webUtils";
import { emailRegex } from "../../utils/constant";
import { AccountCircle, Lock } from "../../accts/iconIndex";
import s from "./signin.module.scss";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const { setToken } = useGetAuthToken();
  const { setUserInfo } = useUserInfo();

  const handleChangesEmail = (e) => {
    setEmail(e.target.value);
    setIsValid(emailRegex.test(e.target.value));
  };

  const handleChangesPass = (e) => {
    setPassword(e.target.value);
  };

  const submitLogin = async () => {
    try {
      const response = await api.post(signin, {
        email,
        password,
      });
      if (response.status === 200 || response.statusText === "OK") {
        const { _id, email, name, token, pic = null } = response.data;
        if (token) {
          setToken(token);
        }
        setUserInfo({
          id: _id,
          email,
          name,
          pic,
        });
      } else {
        console.log("Something went wrong..!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.outer}>
        <p className={s.Signin}>Login</p>
        <div className={s.fieldWrapper}>
          <div className={s.inputWrapper}>
            <input
              placeholder="Email"
              autocomplete="off"
              className={s.input}
              type="text"
              id="email"
              value={email}
              onChange={handleChangesEmail}
            />
            <AccountCircle width="24px" height="24px" />
          </div>
          <div className={s.inputWrapper}>
            <input
              placeholder="Password"
              autocomplete="off"
              className={s.input}
              type="password"
              id="psw"
              name="fname"
              value={password}
              onChange={handleChangesPass}
            />
            <Lock width="24px" height="24px" />
          </div>
        </div>
        <button onClick={submitLogin} className={s.login}>
          Login
        </button>
        <div className={s.signup}>
          <p className={s.text}>Don't have account?</p>
          <button onClick={() => navigate("/signup")} className={s.reg}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
