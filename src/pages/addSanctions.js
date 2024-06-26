import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack,MenuItem, TextField, Typography, SvgIcon } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import getConfig from 'next/config';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { ArrowBack } from '@mui/icons-material';
const { publicRuntimeConfig } = getConfig();

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [logo, setLogo] = useState(null);
  const [responsables, setResponsables] = useState([]);
  const [acteurs, setActeurs] = useState([]);

  const [values, setValues] = useState({
    montant: '',
    description: '',
    initiateur: [],
    date: '',
    submit: null,
  });

  const [errors, setErrors] = useState({
    montant: '',
    description: '',
    initiateur: [],
    date: '',
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
        
        description: Yup.string().max(255).required('Le motif de la sanction doit être précisé'),
        initiateur: Yup.array().required('Le membre conserner doit être mentionné'),
        montant: Yup.number().required('Le montant de la sanction est requis'),
        date: Yup.date().required('La date limite de paiement doit etre mentionné'),
      });

      // await schema.validate(values, { abortEarly: false });

      // Validation succeeded, perform your API call or other actions
      await auth.AddProjet(values.description, acteurs,values.montant,values.datefin);
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
        Ajouter Sanction | Pouapeu
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
          <Link
            component={NextLink}
            href="/sanction"
            underline="hover"
            variant="body"
                >
                  <SvgIcon fontSize="small">
                    <ArrowBack  />
                  </SvgIcon>
                
               Back
              
        </Link>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
              Sanctions
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Ajouter une sanction
              </Typography>
            </Stack>
            {/* <form
              noValidate
              onSubmit={handleSubmits()}
            > */}
              <Stack spacing={3}>
              <Autocomplete
                disablePortal
                  multiple
                  id="responsables"
                  options={responsables}
                  
                  getOptionLabel={(responsable) => responsable.name}
                  value={values.responsables}
                  onChange={(event, newValue) => {
                    const selectedActeurs = newValue.map((responsable) => responsable.name);
                    console.log(selectedActeurs);
                    setActeurs(selectedActeurs);
                    console.log(acteurs);
                    
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Membre"
                      name="responsables"
                      error={!!errors.responsables}
                      helperText={errors.responsables}
                    />
                  )}
                />
                <TextField
                  fullWidth
                  label="Motif de sanction"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                />
                
                <TextField
                  
                  fullWidth
                  label="Montant Sanctions a payer avant  la prochaine assemblée"
                  name="montant"
                  type='number'
                  value={values.montant}
                  onChange={handleChange}
                  error={!!errors.montant}
                  helperText={errors.montant}
                />

                
                <TextField
                  fullWidth
                  
                  name="datefin"
                  value={values.date}
                  onChange={handleChange}
                  error={!!errors.date}
                  helperText={errors.date}
                  type='date'
                />
                
               
              </Stack>
              <Stack spacing={3} sx={{ mb: 3 }}></Stack>
              <Button onClick={handleSubmit} variant="contained" color="primary">
        Valider
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
