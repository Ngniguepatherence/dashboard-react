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
  const [responsables, setResponsables] = useState([]);
  const [type, setType] = useState([]);
  const [acteurs, setActeurs] = useState([]);

  const [values, setValues] = useState({
    montant: '',
    type: '',
    beneficiaire: '',
    date: new Date().toISOString().slice(0, 10),
    submit: null,
  });

  const [errors, setErrors] = useState({
    montant: '',
    type: '',
    beneficiaire: '',
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


  const handleSubmit = async () => {
    try {
      await auth.AddTontine(acteurs.name,values.montant,values.type,values.beneficiaire,values.date);
      router.push('/plat');
    }catch(error) {
      throw new Error('Error');
    }
  };
  const Benef = [
    { value: true, label: 'oui' },
    { value: false, label: 'non' },
  ];

  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <Head>
        <title>
        Plat| Pouapeu
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
            href="/plat"
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
              PLAT
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Ajouter une tontine
              </Typography>
            </Stack>
            {/* <form
              noValidate
              onSubmit={handleSubmits()}
            > */}
              <Stack spacing={3}>
              <Autocomplete
                disablePortal
                  id="responsables"
                  options={responsables}
                  
                  getOptionLabel={(responsable) => responsable.name}
                  value={values.responsables}
                  onChange={(event, newValue) => {
                    setActeurs(newValue);
                    console.log(acteurs);
                    
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Membre"
                      name="responsables"
                      error={!!errors.responsable}
                      helperText={errors.responsables}
                    />
                  )}
                />
          
                <TextField
                  
                  fullWidth
                  label="Montant cotisation"
                  name="montant"
                  type='number'
                  value={values.montant}
                  onChange={handleChange}
                  error={!!errors.montant}
                  helperText={errors.montant}
                />
                <TextField
                  
                  fullWidth
                  label="Beneficiaire ?"
                  name="beneficiaire"
                  type='text'
                  select
                  
                  value={values.beneficiaire}
                  onChange={handleChange}
                  error={!!errors.beneficiaire}
                  helperText={errors.beneficiaire}
                  >
                  {Benef.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                  </TextField>
                
                <TextField
                  
                  fullWidth
                  label="Date"
                  name="date"
                  type='date'
                  value={values.date}
                  onChange={handleChange}
                  error={!!errors.date}
                  helperText={errors.date}
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
