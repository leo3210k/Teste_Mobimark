import React from "react";

import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="flex">
      <img
        className="w-7/12 h-screen"
        src="/assets/images/login-image.png"
        alt="login-image"
      />
      <div className="relative w-5/12 flex">
        <div className="relative flex flex-col justify-center items-center font-black text-black mx-auto">
          <h1 className="text-4xl mb-16">Login</h1>
          <form action="" className="flex flex-col gap-8">
            <div className="flex flex-col gap-y-1">
              <label htmlFor="" className="">
                Email
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                className="w-[25rem]"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="" className="">
                Senha
              </label>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[25rem]"
              />
            </div>
            <div className="flex justify-between items-center">
              <a
                href="/"
                className="text-xl hover:border-b-2 border-neutral-900"
              >
                Esqueceu a senha?
              </a>
              <Button
                variant="contained"
                className="!capitalize w-40 h-14 !bg-black/80 !font-medium"
              >
                Entrar
              </Button>
            </div>
          </form>
        </div>
        <img
          src="/assets/images/login-background.png"
          className="absolute bottom-0"
          alt="login-background"
        />
      </div>
    </div>
  );
}

export default Login;
