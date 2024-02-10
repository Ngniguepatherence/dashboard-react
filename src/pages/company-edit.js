import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack,MenuItem, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [logo, setLogo] = useState(null);
  const [responsables, setResponsables] = useState([]);
  const ProjetId = router.query;
  const [value, setValue] = useState(0);

  // Utilisez l'identifiant de l'entreprise pour charger ses détails depuis l'API ou votre source de données
  const [companyDetails, setCompanyDetails] = useState(null);

  const fetchCompanyDetails = async () => {
    try {
      const response = await fetch(`${publicRuntimeConfig.api.baseURL}/api/projets/${companyId}`);
      const data = await response.json();
      setCompanyDetails(data);
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  };
  

  useEffect(() => {
    if(ProjetId) {
      fetchCompanyDetails();
  }
  
}, [ProjetId]);
    


  const [values, setValues] = useState({
    title: '',
    description: '',
    initiateur: [],
    dateinit: '',
    submit: null,
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    initiateur: [],
    dateinit: '',
  });

  const fetchResponsable = async () => {
    try {
      const response = await axios.get(`${publicRuntimeConfig.api.baseURL}/api/profiles`);
      setResponsables(response.data);
    } catch (error) {
      console.error("Error fetching Responsable: ",error);
    }
  };

  useEffect(() => {
    fetchResponsable();
  }, []);

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

    axios.post(`${publicRuntimeConfig.api.baseURL}/api/projets/uploadImage`, formData, {
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
    console.log(responsables)
    try {
      const schema = Yup.object({
        title: Yup.string().max(255).required('Title is required'),
        description: Yup.string().max(255).required('Description is required'),
        initiateur: Yup.array().required('Initiateur is required'),
        dateinit: Yup.date().required('The initialization date is needed'),
      });

      // await schema.validate(values, { abortEarly: false });

      // Validation succeeded, perform your API call or other actions
      await auth.AddProjet(values.title, values.description, responsables,logo, values.dateinit);
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
        Update | Pouapeu
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
                Mettre a jour un Projet 
              </Typography>
            </Stack>
            
              <Stack spacing={3}>
                <TextField
                  
                  fullWidth
                  label="title"
                  name="title"
                  value={companyDetails.title}
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
                <Autocomplete
                  multiple
                  id="responsables"
                  options={responsables}
                  getOptionLabel={(responsable) => responsable.name}
                  value={values.responsables}
                  onChange={(event, newValue) => {
                    setValues({
                      ...values,
                      responsables: newValue.map((responsable) => responsable.id),
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Responsables"
                      name="responsables"
                      error={!!errors.responsables}
                      helperText={errors.responsables}
                    />
                  )}
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
