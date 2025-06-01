import { useState } from "react";

import { useGetAuthToken } from "../../globleContext/AuthContext";
import { useUserInfo } from "../../globleContext/UserContext";
import { emailRegex } from "../../utils/constant";
import api from "../../utils/axiosInstance";
import { AccountCircle, Lock } from "../../accts/iconIndex";
import { signup } from "../../utils/webUtils";

import s from "./signup.module.scss";

function SignUp() {
  const [name, setName] = useState("");
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

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const submitRegister = async () => {
    try {
      const response = await api.post(signup, {
        name,
        email,
        password,
      });
      console.log("response", response);
      if (response.status === 201 || response.statusText === "Created") {
        const { id, email, name, token, pic = null } = response.data;
        if (token) {
          setToken(token);
        }
        setUserInfo({
          id: id,
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
        <p className={s.Signin}>Register</p>
        <div className={s.fieldWrapper}>
          <div className={s.inputWrapper}>
            <input
              placeholder="Name"
              autocomplete="off"
              className={s.input}
              type="text"
              id="name"
              value={name}
              onChange={handleChangeName}
            />
            <AccountCircle width="24px" height="24px" />
          </div>
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
        <button onClick={submitRegister} className={s.login}>
          SignUp
        </button>
      </div>
    </div>
  );
}

export default SignUp;
