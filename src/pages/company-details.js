// pages/CompanyDetails.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from 'src/layouts/dashboard/layout'; // Importez le composant de mise en page que vous utilisez
import { Box, Button, Link,Tab, Tabs, Stack, TextField, Typography, Card, CardActionArea, CardMedia, CardHeader, Divider } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import * as React from 'react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const CompanyDetails = () => {
  const router = useRouter();
  const { companyId } = router.query;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    if(companyId) {
      fetchCompanyDetails();
  }
  
}, [companyId]);
    

  if (!companyDetails) {
    return <Typography>Loading...</Typography>;
  }

  const date = new Date(companyDetails.createat);

const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);

console.log(formattedDate);

  return (
    <>
    <Head>
        <title>
        Details Projet | Pouapeu
        </title>
      </Head>
      <Box
      
        
      >
        <Box 
        sx={{
          flex: '1 1 auto',
          // alignItems: 'center',
          gap:1,
          display: 'flex',
          justifyContent: 'center',
          maxHeight: '100%',
          width: '100%',
        }}>
        <Card 
         sx={{ maxWidth: 700 }}
        >
          <CardMedia
            component="img"
            image={`${publicRuntimeConfig.api.baseURL}/api/files/${companyDetails.logo}`}
            alt="Company Image"
          />
        </Card>
        <Typography variant="h4">{companyDetails.title}</Typography>
        </Box>
        <Divider />
        
        <Box
          sx={{ width: '100%' }}
        >
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >

          <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Description" />
                <Tab label="Responsables" />
              </Tabs>
            </Stack>
        </Box>
        <CustomTabPanel value={value} index={0}>
        <Typography>
        <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Description du Projet: </span>{' '}
          {companyDetails.description}</Typography>
        <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
      </Stack>
       <Typography sx={{mt: 2}}>
       <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Créer le</span>{' '}
       <span style={{ fontStyle: 'italic' }}>{formattedDate}</span>{' '}
       </Typography>
       <Typography sx={{mt: 2, textAlign: 'center'}}>
       <span style={{ fontWeight: 'bold', fontStyle: 'italic', justifyItems: 'center'}}>Evolution du projet</span>{' '}
       
       </Typography>
       <Typography sx={{mt: 2}}>
      <span style={{  fontStyle: 'italic' }}>Premier Rapport Projet: </span>{' '}
       <span style={{fontWeight: 'bold', fontStyle: 'italic' }}>{}</span>{' '}
       <Button style={{flex:'flex-end',color:'blue'}} > ajouter un rapport de projet</Button>
       </Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Typography sx={{mt: 2}}>
      <span style={{  fontStyle: 'italic' }}>Initiateur de Projet: </span>{' '}
       <span style={{fontWeight: 'bold', fontStyle: 'italic' }}>{companyDetails.responsable}</span>{' '}
       </Typography>
      

       <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Ajouter des membres aux projets
              </Button>
      </CustomTabPanel>
            
      
        </Box>

      </Box>
      
    </>
  );
};
CompanyDetails.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CompanyDetails;
