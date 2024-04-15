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
  Snackbar,
  Box,
  Typography
} from '@mui/material';
import * as Yup from 'yup';
import { useAuth } from 'src/hooks/use-auth';
import axios from 'axios';
import getConfig from 'next/config';
import Head from 'next/head';
const { publicRuntimeConfig } = getConfig();
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const ResetPassword = () => {
  const auth = useAuth();
  const router = useRouter();

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });



  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm: '',
      submit: null
    },
    validationSchema: Yup.object({
      password: Yup
        .string()
        .min(8)
        .max(255)
        .required('Password is required'),
      confirm: Yup
        .string()
        .min(8)
        .max(255)
        .required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
        console.log(values);
        if(values.password != values.confirm) {
            setNotification({
                open: true,
                message: 'Mot de passe incorrect.',
                severity: 'error'
              });
        }
        else {

            try {
                console.log(values)
            const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/profiles/reset-password/${auth.user.id}`, {
                password: values.password
              })
              if(response.status == 201) {

                  auth.signOut();
                  signOut();
                  router.push('/');
              }
            
          } catch (err) {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
          }
        }
    }
  });


  return (
    <>
    <Head>
          <title>
            Modification de mot de passe| Association GTR
          </title>
        </Head>
        <Box
          sx={{
            flex: '1 1 auto',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          
          <Box
            sx={{
              maxWidth: 550,
              px: 3,
              py: '100px',
              width: '100%'
            }}
          >
    <form noValidate
            onSubmit={formik.handleSubmit}>
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
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Mot de passe"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              required
              value={formik.password}
            />
            <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Mot de passe (veuillez confirmer)"
              name="confirm"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              required
              value={formik.confirm}
            />
            
          </Stack>
          {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
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
    </Box>
        </Box>
    </>
  );
};

ResetPassword.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default ResetPassword;
