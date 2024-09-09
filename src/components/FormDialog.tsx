import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MultipleSelectChip from './utils/MultiSelectChip';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} className="!text-base !font-mulish !bg-[#6691ff] !normal-case !px-[2.2rem] !py-[0.6rem]">
        Nova Escola
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Adicionar escola</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Aqui você adiciona novas escolas a serem colocadas
            no sistema.
          </DialogContentText>
          <div className="flex gap-6">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Nome da escola"
              type="name"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="director"
              name="director"
              label="Nome do diretor"
              type="director"
              fullWidth
              variant="outlined"
            />
          </div>
          <div className="flex gap-6">
            <TextField
              autoFocus
              required
              margin="dense"
              id="city"
              name="city"
              label="Cidade"
              type="city"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="location"
              name="location"
              label="Localização"
              type="location"
              fullWidth
              variant="outlined"
            />
          </div>
          <TextField
            autoFocus
            required
            margin="dense"
            id="shifts"
            name="shifts"
            label="Turnos"
            type="shifts"
            fullWidth
            variant="outlined"
          />
          <MultipleSelectChip />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit">Confirmar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
