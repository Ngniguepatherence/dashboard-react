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

  const [values, setValues] = useState({
    title: '',
    description: '',
    inititeur: '',
    dateinit: '',
    submit: null,
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    inititeur: '',
    dateinit: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
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
        console.log("Image Res::::", res.data.data);
        if (res.data.messsage === "Files Uploaded") {
          setLogo(res.data.data[0]?.img)
        }
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  const handleSubmit = async () => {
    try {
      const schema = Yup.object({
        title: Yup.string().max(255).required('Title is required'),
        description: Yup.string().max(255).required('Description is required'),
        inititeur: Yup.string().max(255).required('Initiateur is required'),
        dateinit: Yup.date().required('The initialization date is needed'),
      });

      // await schema.validate(values, { abortEarly: false });

      // Validation succeeded, perform your API call or other actions
      await auth.AddProjet(values.title, values.description, auth.user.id,logo, values.dateinit);
      router.push('/companies');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <>
      <Head>
        <title>
        Ajouter Projet | Pouapeu
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
            {/* <form
              noValidate
              onSubmit={handleSubmits()}
            > */}
              <Stack spacing={3}>
                <TextField
                  
                  fullWidth
                  label="title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                />

                <TextField
                  fullWidth
                  label="description du projet"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                />
                
               
                
                <TextField
                  
                  name="logo"
                  onChange={(e) => {
                    uploadImageFunction(e.target.files[0])
                  }}
                  type="file"
                  value={values.logo}
                  inputProps={{ accept: 'image/*' }}
                />

                <TextField
                  fullWidth
                  // label="date d'initialisation"
                  name="dateinit"
                  value={values.dateinit}
                  onChange={handleChange}
                  error={!!errors.dateinit}
                  helperText={errors.dateinit}
                  type='date'
                />
                
               
              </Stack>
              
              <Button onClick={handleSubmit} variant="contained" color="primary">
        Submit
      </Button>
          
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
