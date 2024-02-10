// import { useCallback, useState } from 'react';
// import {
//   Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   Divider,
//   Stack,
//   TextField,
//   Snackbar
// } from '@mui/material';
// import { useAuth } from 'src/hooks/use-auth';
// import axios from 'axios';
// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();

// export const SettingsPassword = () => {
//   const auth = useAuth();
//   const [values, setValues] = useState({
//     password: '',
//     confirm: ''
//   });

//   const handleChange = useCallback(
//     (event) => {
//       setValues((prevState) => ({
//         ...prevState,
//         [event.target.name]: event.target.value
//       }));
//     },
//     []
//     );
    
//     const handleSubmit = useCallback(
//       (event) => {
//         event.preventDefault();
//         console.log(values);
//         updatepassword();
//     },
//     []
//   );

//   const updatepassword = async () =>{
//     const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/profiles/reset-password`, {
     
//     });
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <Card>
//         <CardHeader
//           subheader="Mettre a jour le mot de passe"
//           title="Password" 
//         />
//         <Divider />
//         <CardContent>
//           <Stack
//             spacing={3}
//             sx={{ maxWidth: 400 }}
//           >
//             <TextField
//               fullWidth
//               label="Mot de passe"
//               name="password"
//               onChange={handleChange}
//               type="password"
//               value={values.password}
//             />
//             <TextField
//               fullWidth
//               label="Mot de passe (veillez Confirmer)"
//               name="confirm"
//               onChange={handleChange}
//               type="password"
//               value={values.confirm}
//             />
//           </Stack>
//         </CardContent>
//         <Divider />
//         <CardActions sx={{ justifyContent: 'flex-end' }}>
//           <Button variant="contained" type='submit'>
//             Mettre a jour
//           </Button>
//         </CardActions>
//       </Card>
//     </form>
//   );
// };


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
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const SettingsPassword = () => {
  const auth = useAuth();
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
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

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        if(values.password != values.confirm) {
          setNotification({
            open: true,
            message: 'Mot de passe incorrect.',
            severity: 'error'
          });
        } else  {

          const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/profiles/reset-password`, {
            id:  auth.user.id,
            password: values.confirm
          });
          
          setNotification({
            open: true,
            message: 'Mot de passe mis à jour avec succès!',
            severity: 'success'
          });

          router.push('/account');
        }

        // Vous pouvez effectuer d'autres actions ici après la mise à jour du mot de passe, si nécessaire.

      } catch (error) {
        setNotification({
          open: true,
          message: 'Erreur lors de la réinitialisation du mot de passe.',
          severity: 'error'
        });
      }
    },
    [values]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Mettre à jour le mot de passe"
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
              label="Mot de passe (veuillez confirmer)"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Mettre à jour
          </Button>
        </CardActions>
      </Card>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        message={notification.message}
        severity={notification.severity}
      />
    </form>
  );
};
