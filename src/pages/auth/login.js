import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
// import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';

const Page = () => {
  const router = useRouter();
  // const auth = useAuth();
  const [method, setMethod] = useState('email');

  const formik = useFormik({
    initialValues: {
      email: 'demo@devias.io',
      password: 'Password123!',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        const response = await axios.post('http://localhost:5000/api/users/login', {
          email: values.email,
          password: values.password,
        }
        );
        if (response.status === 200) {
          console.log('Connexion réussie !');
          router.push('/');
          // Rediriger ou effectuer d'autres actions après la connexion réussie
        } else {
          console.error('Échec de la connexion');
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );

  

  return (
    <>
      <Head>
        <title>
          Connection | Pouapeu
        </title>
      </Head>
      <Box
        sx={{
          // backgroundColor: 'background.paper',
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
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Connexion
              </Typography>

              
            </Stack>
            {method === 'email' && (
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    // type="email" 
                    value={formik.values.email}
                  />
                  <TextField
                    error={!!(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label="Mot de passe"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                  />
                </Stack>

                <Link
                  component={NextLink}
                  href="/auth/reset_password"
                  underline="hover"
                  variant="subtitle2"
                  
                >
                   Mot de passe oublie
                </Link>
                

                {formik.errors.submit && (
                  <Typography
                    color="error"
                    sx={{ mt: 3 }}
                    variant="body2"
                  >
                    {formik.errors.submit}
                  </Typography>
                )}
                
                <Link
                  component={NextLink}
                  href=""
                  underline="hover"
                  variant="subtitle2"
                  className='p-4'
                >
                  mot de passe oublie
                </Link>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Connexion
                </Button>

                <Typography
                color="text.secondary"
                variant="body2"
              >
                J&apos;aimerai faire partie de l&apos;association!
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  s&apos;erroller
                </Link>
              </Typography>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  
                >
                  Connexion avec Google
                </Button>
                

              </form>
              
            )}
            
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
