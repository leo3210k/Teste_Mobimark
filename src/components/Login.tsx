import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import { Alert, Button, Snackbar } from "@mui/material";
import { BASE_URL } from "./utils/Api";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async () => {
    const data = { email, senha: password};
    
    try {
      await axios.post(`${BASE_URL}/login/run`, data)
        .then(res => {
          localStorage.setItem('userKey', JSON.stringify(res.data));
          navigate("/", { state: { successfulLogin: true } });
        })
        .catch(err => {
          setOpenAlert(true);
          console.log(err);
        })

    } catch (error) {
      setOpenAlert(true);
      console.error('Erro ao adicionar escola:', error);
    }
  }

  const handleClose = () => {
    setOpenAlert(false);
  };

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
                id="outlined"
                variant="outlined"
                size="small"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  console.log(email)
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
                onClick={onSubmit}
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
      <Snackbar
        open={openAlert}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          E-mail ou senha inválidos!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
