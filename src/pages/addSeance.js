import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Button, Link, Stack,MenuItem, TextField, Typography, SvgIcon } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useEffect, useState } from 'react';
import getConfig from 'next/config';
import { ArrowBack } from '@mui/icons-material';
const { publicRuntimeConfig } = getConfig();

const Page = () => {
  const router = useRouter();
  const auth = useAuth();

  const [values, setValues] = useState({
    type: '',
    tontinard: '',
    effectif: '',
    tontine: '',
    cotise: '',
    date: new Date().toISOString().slice(0, 10),
    submit: null,
  });

  const [errors, setErrors] = useState({
    montant: '',
    type: '',
    tontinard: '',
    effectif: '',
    tontine: '',
    cotise: '',
    date: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };


  const handleSubmit = async () => {
    try {
      await auth.AddMeeting(values.date,values.type,values.cotise,values.tontine, values.effectif);
      router.push('/seance');
    }catch(error) {
      throw new Error('Error');
    }
  };
 
  const options = [
    { value: 'Plat', label: 'PLAT' },
    { value: 'contrib_sociale', label: 'contribution sociale' },
    { value: 'tontine', label: 'Tontine' },
    // { value: 'contr', label: 'contribution sociale' },
  ];

  return (
    <>
      <Head>
        <title>
        MEETING | Pouapeu
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
            href="/seance"
            underline="hover"
            variant="body"
            color={"black"}
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
              MEETING POUAPOU
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Ajouter un Meeting
              </Typography>
            </Stack>
            {/* <form
              noValidate
              onSubmit={handleSubmits()}
            > */}
              <Stack spacing={3}>
              
                
                <TextField
                  required
                  fullWidth
                  label="Nature du Meeting"
                  name="type"
                  type='text'
                  select
                  
                  onChange={handleChange}
                  error={!!errors.type}
                  helperText={errors.type}
                  >
                  {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                  </TextField>
                <TextField
                  
                  fullWidth
                  label="Nbre Personne Tontinard"
                  name="cotise"
                  type='number'
                  value={values.cotise}
                  onChange={handleChange}
                  error={!!errors.cotise}
                  helperText={errors.cotise}
                />
                <TextField
                  
                  fullWidth
                  label="Nbre Personne non Tontinard"
                  name="tontine"
                  type='number'
                  value={values.tontine}
                  onChange={handleChange}
                  error={!!errors.tontine}
                  helperText={errors.tontine}
                />
                <TextField
                  
                  fullWidth
                  label="EFFECTIF MEETING"
                  name="effectif"
                  type='number'
                  value={values.effectif}
                  onChange={handleChange}
                  error={!!errors.effectif}
                  helperText={errors.effectif}
                />
                
                
                
                <TextField
                  required
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
