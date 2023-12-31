// pages/CompanyDetails.js
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from 'src/layouts/dashboard/layout'; // Importez le composant de mise en page que vous utilisez
import { Box, Button, Link,Tab, Tabs, Stack, TextField, Typography, Card, CardActionArea, CardMedia, CardHeader, Divider } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import * as React from 'react';

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
      const response = await fetch(`http://localhost:5000/api/projets/${companyId}`);
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
            image={companyDetails.logo}
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
        <Typography>{companyDetails.description}</Typography>
       <Typography sx={{mt: 2}}>Creer le <Typography variant='subtitle2' >{companyDetails.createat}</Typography></Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Typography>{companyDetails.responsable}</Typography>
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
