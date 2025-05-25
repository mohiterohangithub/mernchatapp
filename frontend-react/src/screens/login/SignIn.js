import { useState } from "react";
import s from "./signin.module.scss";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={s.container}>
      <div className={s.outer}></div>
    </div>
  );
}

export default SignIn;
