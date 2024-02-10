import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Card, CardContent, CardHeader, Snackbar,Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import axios from 'axios';
import { useState } from 'react';


const Page = () => {
    const router = useRouter();
    const auth = useAuth();

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
        email: '',
        submit: null
      },
      validationSchema: Yup.object({
        email: Yup
          .string()
          .max(255)
          .required('Email is required'),
      }),
      onSubmit: async (values, helpers) => {
        try {
          const response = await auth.forgotPassword(values.email)
          
          setNotification({
            open: true,
            message: `${response}`,
            severity: 'success'
          });

          router.push('/verification-code');
          
        } catch (err) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
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
          <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        message={notification.message}
        severity={notification.severity}
      />
      <Link
                  component={NextLink}
                  href="/"
                  underline="hover"
                  variant="subtitle2"
                > Back</Link>
          <Box
            sx={{
              maxWidth: 550,
              px: 3,
              py: '100px',
              width: '100%'
            }}
          >

        <Card style={{}}>
            <CardHeader
            title="Mot de passe oublié"
            />
            <CardContent>
                <form
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Entrez votre email"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    required
                    value={formik.email}
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
                
                    {/* <Link
                  component={NextLink}
                  href="/verification-code"
                  underline="hover"
                  variant="subtitle2"
                > */}
                    <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Envoyer le lien de réinitialisation
                  </Button>
                {/* </Link> */}
                </form>
            </CardContent>
                
        
       
        
        </Card>
            
          </Box>
        </Box>
      </>
    );
  };
  
  Page.getLayout = (page) => (
      {page}
 
  );
  
  export default Page;
  