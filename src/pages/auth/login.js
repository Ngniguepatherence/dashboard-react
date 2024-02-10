'use client'
import { useCallback, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {signIn, signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { useAuth } from 'src/hooks/use-auth';
import * as Yup from 'yup';
import axios from 'axios';
import firebase from 'firebase/app';
import { useSession } from 'next-auth/react';
import 'firebase/auth';
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
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();


const Page = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const auth = useAuth();
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
        await auth.signIn(values.email, values.password);
          router.push('/');
          // Rediriger ou effectuer d'autres actions après la connexion réussie
        
         
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

const GoogleConnect = async () => {

  // Vérifier si l'utilisateur est connecté avec Google
  if (!session || !session.user) {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    await signIn();
    const { user, expires } = session;
    const response = await auth.signInWithGoogle(user.email, expires);
    console.log(response);
    router.push('/');// Arrêter l'exécution de la fonction
  }

  const { user, expires } = session;

  // Envoie d'une requête au backend pour vérifier l'existence de l'email dans la base de données
  
const response = await auth.signInWithGoogle(user.email, expires);
console.log(response);
router.push('/');// Arrêter l'exécution de la fonction
};



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
          Login | Association GTR
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
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
                Login
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
                    type="email" 
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
                  href="/auth/forget-password"
                  underline="hover"
                  variant="subtitle2"
                  
                >
                   Mot de passe oublié 
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
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Connexion
                </Button>
                
                
              <Button
                  onClick={GoogleConnect}
                  // onClick={}
                >
                  Connexion avec google
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
