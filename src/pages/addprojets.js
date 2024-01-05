import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
import { useState } from 'react';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [logo, setLogo] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };


  const uploadImageFunction = (File) => {
    console.log("Image Res::::");
    const formData = new FormData();
    formData.append("files", File);

    axios.post(`http://localhost:5000/api/projets/uploadImage`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(res => {
        console.log("Image Res::::", res.data.data[0].img);
        if (res.data.messsage === "Files Uploaded") {
          setLogo(res.data.data[0]?.img)
        }
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      responsable: '',
      logo: null,
      dateinit: '',
      submit: null
    },
    validationSchema: Yup.object({
      title: Yup
        .string()
        .max(255)
        .required('title is required'),
      description: Yup
        .string()
        .max(255)
        .required('you must add a description to this project'),
      dateinit: Yup
        .date()
        .required('the initialization date is needed')
    }),
    onSubmit: async (values, helpers) => {
      try {
        
        await auth.AddProjet(values.title,values.description, auth.user.id, logo, values.dateinit);
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
        Ajouter membre | Pouapeu
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
              Projet
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Ajoutez un Projet 
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.title && formik.errors.title)}
                  fullWidth
                  helperText={formik.touched.title && formik.errors.title}
                  label="title"
                  name="title"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />

                <TextField
                  error={!!(formik.touched.description && formik.errors.description)}
                  fullWidth
                  helperText={formik.touched.description && formik.errors.description}
                  label="description du projet"
                  name="description"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.description}
                />

               
                
                <TextField
                  error={!!(formik.touched.logo && formik.errors.logo)}
                  fullWidth
                  helperText={formik.touched.logo && formik.errors.logo}
                  label="logo"
                  name="logo"
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    uploadImageFunction(e.target.files[0])
                  }}
                  type="file"
                  value={formik.values.logo}
                  inputProps={{ accept: 'image/*' }}
                />

                <TextField
                  error={!!(formik.touched.dateinit && formik.errors.dateinit)}
                  fullWidth
                  helperText={formik.touched.dateinit && formik.errors.dateinit}
                  // label="date d'initialisation"
                  name="dateinit"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="date"
                  value={formik.values.dateinit}
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
                Ajouter
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};


Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default Page;
