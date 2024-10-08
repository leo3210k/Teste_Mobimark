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
        className="hidden lg:block w-7/12 h-screen"
        src="/assets/images/children.jpg"
        alt="login-image"
      />
      <div className="relative h-screen w-screen lg:w-5/12 lg:h-auto flex">
        <div className="relative flex flex-col justify-center items-center font-black text-black/80 mx-auto">
          <img src="/assets/icons/logo.svg" className="w-72 mb-16" alt="logo" />
          <form action="" className="flex flex-col items-center sm:items-stretch gap-8">
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
                className="w-[20rem] xs:w-[25rem]"
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
                className="w-[20rem] xs:w-[25rem]"
              />
            </div>
            <div className="flex justify-between items-center gap-4">
              <a
                href="/"
                className="text-xl hover:border-b-2 border-neutral-900"
              >
                Esqueceu a senha?
              </a>
              <Button
                variant="contained"
                className="!capitalize w-40 h-14 !text-lg !bg-[#6691ff] hover:!bg-[#567bd8] !font-medium"
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
