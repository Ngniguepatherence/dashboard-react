import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Card, CardContent, CardHeader, Snackbar,Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import axios from 'axios';
import { useState } from 'react';


const Verification = () => {
    const router = useRouter();
    const auth = useAuth();

    const [notification, setNotification] = useState({
      open: false,
      message: '',
      severity: 'success'
    });
    const handleChange = (event, index) => {
        const { value } = event.target;
        // Met à jour la valeur du champ dans formik
        formik.setFieldValue('codepin', updateCodeAtIndex(formik.values.codepin, index, value));
      };
    const handlePaste = (event) => {
        event.preventDefault();
        const pasteData = event.clipboardData.getData('text/plain').slice(0, 6); // Limite la longueur à 6 caractères
        // Met à jour la valeur du champ dans formik
        formik.setFieldValue('codepin', pasteData);
      };
    
      const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && index > 0 && !formik.values.codepin[index]) {
          // Supprime le caractère précédent si la touche de suppression est pressée
          formik.setFieldValue('codepin', updateCodeAtIndex(formik.values.codepin, index - 1, ''));
        }
      };
    
      const updateCodeAtIndex = (code, index, value) => {
        const updatedCode = [...code];
        updatedCode[index] = value;
        return updatedCode;
      };
      // Récupère le code complet sous forme de chaîne de caractères
      const getCodeAsString = () => {
        return formik.values.codepin.join('');
      };

    const handleCloseNotification = () => {
      setNotification({
        ...notification,
        open: false
      });
    };
    const formik = useFormik({
      initialValues: {
        codepin: '',
        submit: null
      },
      validationSchema: Yup.object({
        codepin: Yup
          .string()
          .max(6)
          .required('code pin is required'),
      }),
      onSubmit: async (values, helpers) => {
        try {
          const response = await auth.VerificationCode(values.codepin);
          setNotification({
            open: true,
            message: `${values.codepin}`,
            severity: 'success'
          });
          router.push('/auth/reset_password');
          
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
        title='Verification Code'
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        message={notification.message}
        severity={notification.severity}
      />
          <Box
            sx={{
              maxWidth: 550,
              px: 3,
              py: '100px',
              width: '100%'
            }}
          >
             <Link
                  component={NextLink}
                  href="/settings"
                  underline="hover"
                  variant="subtitle2"
                > Back</Link>

        <Card style={{}}>
            <CardHeader
            title="Code de Vérification"
            />
            <CardContent>
                <form
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                <Stack spacing={3}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {[...Array(6).keys()].map((index) => (
          <Box
            key={index}
            sx={{
              width: '40px',
              height: '40px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TextField
              fullWidth
              type="text"
              inputProps={{
                style: {
                  textAlign: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                },
                maxLength: 1,
                onPaste: handlePaste,
                onKeyDown: (event) => handleKeyDown(event, index), // Gère le collage
              }}
              value={formik.values.codepin[index] || ''}
              onChange={(event) => handleChange(event, index)}
              name={`codepin[${index}]`}
            />
          </Box>
        ))}
      </Box>

                  
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
                  Vérifier
                  </Button>
                </form>
            </CardContent>
                
        
       
        
        </Card>
            
          </Box>
        </Box>
      </>
    );
  };
  
  Verification.getLayout = (page) => (
    <AuthLayout>
    {page}
  </AuthLayout>
  );
  
  export default Verification;
  