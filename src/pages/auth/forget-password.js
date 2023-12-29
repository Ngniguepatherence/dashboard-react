import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import axios from 'axios';


const Page = () => {
    const router = useRouter();
    const auth = useAuth();
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
         
          if(response.data.success){
            await auth.signIn(values.new_password, values.confirm_password);
            router.push('/');
          }else {
            helpers.setStatus({ success: false });
          helpers.setErrors({ submit: response.data.message });
          helpers.setSubmitting(false);
          }
          router.push('/');
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
                 Mot de passe Oublie
                </Typography>
                
              </Stack>
              <form
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Stack spacing={3}>
                  
                  <TextField
                    error={!!(formik.touched.new_password && formik.errors.new_password)}
                    fullWidth
                    helperText={formik.touched.new_password && formik.errors.new_password}
                    label="Entrez votre email"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.new_password}
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
                
                    <Link
                  component={NextLink}
                  href="/auth/confirm"
                  underline="hover"
                  variant="subtitle2"
                >
                    <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Valider
                  </Button>
                </Link>
                  
               
              </form>
              
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
  