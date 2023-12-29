import { useCallback, useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import axios from 'axios';
import { useAuthContext } from '../../contexts/auth-context';

const states = [
  {
    value: 'bertoua',
    label: 'Bertoua'
  },
  {
    value: 'douala',
    label: 'Douala'
  },
  {
    value: 'yaounde',
    label: 'Yaounde'
  },
  {
    value: 'bafoussam',
    label: 'Bafoussam'
  }
];

export const AccountProfileDetails = () => {
  const [values, setValues] = useState({
    firstName: 'Joseph',
    lastName: 'Nkengfack',
    email: 'demo@association.org',
    phone: '',
    state: 'Yaounde',
    country: 'Cameroon'
  });
  const { user } = useAuthContext();

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

    const handleSubmitGoogle = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/google');
        console.log(response);
        
      }
      catch(error) {
        console.error('Error fetching data: ',error);
      }
    };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Ses informations peuvent etre modifie"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="svp veillez saisir votre nom"
                  label="Nom"
                  name="firstName"
                  onChange={handleChange}
                  required
                  disabled={true}
                  value={user.name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  disabled={true}
                  label="Prenom"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={user.prenom}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  disabled={true}
                  label="Adresse Mail"
                  name="email"
                  onChange={handleChange}
                  required
                  value={user.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Numero de telephone"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={user.phone}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Pays"
                  name="country"
                  onChange={handleChange}
                  required
                  value={values.country}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Choisissez une ville"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Sauvegarder les details
          </Button>
          
        </CardActions>
        <CardActions sx={{ justifyContent: 'flex-start' }}>
          <Button variant="contained" onClick={handleSubmitGoogle}>
            Ajouter son compte Google
          </Button>
          
        </CardActions>
        
      </Card>
    </form>
    
  );
};
