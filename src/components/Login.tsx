import React from 'react';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

function Login() {
  return (
    <div className="flex">
      <img className="w-7/12 h-screen" src="/assets/images/login-image.png" alt="login-image" />
      <div className="relative w-5/12 flex"> 
        <img src="/assets/images/login-background.png" className="absolute bottom-0" alt="login-background" />
      </div>
    </div>
  );
}

export default Login;
