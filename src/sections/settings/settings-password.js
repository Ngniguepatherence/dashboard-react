import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
  Snackbar
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import axios from 'axios';

export const SettingsPassword = () => {
  const auth = useAuth();
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
    );
    
    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();
        console.log(values);
        updatepassword();
    },
    []
  );

  const updatepassword = async () =>{
    const response = await axios.post('http://localhost:5000/api/profiles/reset-password', {
     
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Mettre a jour le mot de passe"
          title="Password" 
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label="Mot de passe"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Mot de passe (veillez Confirmer)"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Mettre a jour
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
