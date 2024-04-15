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
import {IconButton, TextareaAutosize,  SvgIcon} from '@mui/material';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';
import { PDFDocument, rgb,StandardFonts } from 'pdf-lib';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

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


const CompanyDetails = ({ onAddContribution }) => {
  const router = useRouter();
  const { customerId } = router.query;
  const [customerDetails, setCustomerDetails] = useState(null);
  

  


  // Utilisez l'identifiant de l'entreprise pour charger ses détails depuis l'API ou votre source de données

  const fetchCompanyDetails = async () => {
    try {
      const response = await fetch(`${publicRuntimeConfig.api.baseURL}/api/profiles/${customerId}`);
      const data = await response.json();
      setCustomerDetails(data);
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  };
  

  useEffect(() => {
    if(customerId) {
      fetchCompanyDetails();
  }
  
}, [customerId]);
    

  if (!customerDetails) {
    return <Typography>Loading...</Typography>;
  }

  const date = new Date(customerDetails.createat);

const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);

// console.log(formattedDate);

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
        {isEditingDescription ? 
        
        (
        <>
          <TextareaAutosize
            value={newDescription}
            onChange={handleDescriptionChange}
            rows={4}
            autoFocus
          />
          <IconButton onClick={handleSaveDescription}>Save</IconButton>
          <IconButton onClick={handleCancelEdit}>Cancel</IconButton>
        </>
      ) :
        (
          
        <CustomTabPanel value={value} index={0}>
          
        <Typography>
        <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Description du Projet: </span>{' '}
          {companyDetails.description} <IconButton onClick={handleEditDescription}>
              <EditIcon />
            </IconButton></Typography>
          
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
      <span style={{  fontStyle: 'italic' }}> Rapport Projet: </span>{' '}
       <span style={{fontWeight: 'bold', fontStyle: 'italic' }}>{}</span>{' '}
       <Button style={{flex:'flex-end',color:'blue'}} onClick={handleAddReport}> Ajouter un rapport de projet</Button>
              
            <Button
                    color="inherit"
                    onClick={generatePdf}
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Télécharger
                  </Button>
       </Typography>

       {companyDetails.rapports.map((report,index) => (
      <div key={index}>
        <Typography variant="h6">Rapport Title: {report.title}</Typography>
        <Typography>Contenu : {report.content}</Typography>
        {/* Si vous avez des informations supplémentaires à afficher, vous pouvez les ajouter ici */}
      </div>
    ))}

       {isAddingReport ? (<>
        <TextField
          label="Titre du rapport"
          value={reportData.title}
          onChange={(e) => setReportData({ ...reportData, title: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextareaAutosize
          value={reportData.content}
          onChange={(e) => setReportData({ ...reportData, content: e.target.value })}
          rows={4}
          fullWidth
          placeholder="Saisissez le contenu du rapport"
        />
        <Button onClick={handleSaveReport} variant="contained" color="primary">
          Enregistrer le rapport
        </Button>
       </>):(<></>)}
        
       
      
        </CustomTabPanel>
       )}
      <CustomTabPanel value={value} index={1}>
      <Typography sx={{mt: 2}}>
      <span style={{  fontStyle: 'italic' }}>Initiateur de Projet: </span>{' '}
       <span style={{fontWeight: 'bold', fontStyle: 'italic' }}>{companyDetails.responsable}</span>{' '}
       </Typography>
      
       <h2>Contributions</h2>
       <form onSubmit={handleSubmit}>
      <TextField
        label="Membre"
        value={member}
        onChange={(e) => setMember(e.target.value)}
      />
      <TextField
        label="Montant"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Ajouter
      </Button>
    </form>

    <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Membre</TableCell>
              <TableCell>Montant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contributions.map((contribution, index) => (
              <TableRow key={index}>
                <TableCell>{contribution.member}</TableCell>
                <TableCell>{contribution.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
