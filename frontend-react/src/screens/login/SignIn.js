import { useState } from "react";
import api from "../../utils/axiosInstance";
import { signin } from "../../utils/webUtils";
import s from "./signin.module.scss";
import { AccountCircle, Lock } from "../../accts/iconIndex";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangesEmail = (e) => {
    setEmail(e.target.value);
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
      console.log("response", response);
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
        <button className={s.login}>Login</button>
        <div className={s.signup}>
          <p className={s.text}>Don't have account?</p>
          <button className={s.reg}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
