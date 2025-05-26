import { useState } from "react";
import api from "../../utils/axiosInstance";
import { signin } from "../../utils/webUtils";
import s from "./signin.module.scss";

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
        <div className={s.fieldWrapper}>
          <label className={s.label} htmlFor="email">
            Email:
          </label>
          <input
            className={s.input}
            type="text"
            id="email"
            value={email}
            onChange={handleChangesEmail}
          />
          <label className={s.label} htmlFor="psw">
            Password:
          </label>
          <input
            className={s.input}
            type="password"
            id="psw"
            name="fname"
            value={password}
            onChange={handleChangesPass}
          />
        </div>
        <button onClick={submitLogin}>Submit</button>
        <button>SignUP</button>
      </div>
    </div>
  );
}

export default SignIn;
