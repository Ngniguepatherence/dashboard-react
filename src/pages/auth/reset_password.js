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
        new_password: '',
        confirm_password: '',
        submit: null
      },
      validationSchema: Yup.object({
        new_password: Yup
          .string()
          .min(8)
          .max(255)
          .required('password is required'),
        confirm_password: Yup
          .string()
          .min(8)
          .max(16)
          .required('password is required'),
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
                  Reset Password
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
                    label="Entrez le nouveau mot de passe"
                    name="new_password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.new_password}
                  />
                  <TextField
                    error={!!(formik.touched.confirm_password && formik.errors.confirm_password)}
                    fullWidth
                    helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                    label="Confirme ton mot de passe"
                    name="confirm_password"
                    type="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.confirm_password}
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
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                >
                  Reintialiser son mot de passe
                </Button>
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
  