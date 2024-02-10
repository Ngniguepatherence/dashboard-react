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
  const { companyId } = router.query;
  const [value, setValue] = useState(0);
  const [companyDetails, setCompanyDetails] = useState(null);
  
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newDescription, setNewDescription] = useState(null);
  const [reportData, setReportData] = useState({
    title: '',
    content: '',
    file: null,
  });
  const [isAddingReport, setIsAddingReport] = useState(false);
  const [member, setMember] = useState('');
  const [amount, setAmount] = useState('');
  const [contributions, setContributions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddContribution({member, amount});
    setMember('');
    setAmount('');
  };

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  


  const handleAddContribution = (contribution) => {
    setContributions([...contributions, contribution]);
  };
 


  const handleSaveDescription = async() => {
    // Logique pour enregistrer la nouvelle description
    console.log(newDescription);
    const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/projets/description/${companyDetails._id}`, {description: newDescription})
    console.log(response);
    setIsEditingDescription(false);
    router.reload();
  };

  
  const handleCancelEdit = () => {
    // Annuler la modification de la description
    setIsEditingDescription(false);
    setNewDescription(companyDetails.description); // Réinitialiser la valeur de la nouvelle description
  };

  const handleDescriptionChange = (event) => {
    setNewDescription(event.target.value);
    
  };

  const generatePdf = async () => {
    const pdfDoc = await PDFDocument.create();
  
    // Ajouter une nouvelle page au document PDF
    const page = pdfDoc.addPage();
  
    // Définir la police de caractères à utiliser pour les titres et les paragraphes
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  
    // Définir les paramètres de mise en forme
    const fontSize = 12;
    const titleFontSize = 16;
    const lineHeight = 20;
    const margin = 50;
  
    // Fonction pour ajouter un titre
    const addTitle = (text, y) => {
      page.drawText(text, { x: margin, y, size: titleFontSize, font });
    };
  
    // Fonction pour ajouter un paragraphe
    const addParagraph = (text, y) => {
      const words = text.split(' ');
      let line = '';
      for (const word of words) {
          const width = font.widthOfTextAtSize(line + ' ' + word, fontSize);
          if (width < page.getWidth() - 2 * margin) {
              line += (line ? ' ' : '') + word;
          } else {
              page.drawText(line, { x: margin, y, size: fontSize, font });
              y -= lineHeight;
              line = word;
          }
      }
      if (line.trim().length > 0) {
          page.drawText(line, { x: margin, y, size: fontSize, font });
          y -= lineHeight;
      }
  };
  
    // Position verticale initiale pour afficher les éléments
    let y = page.getHeight() - margin;
  
    // Ajouter le titre du projet
    addTitle(companyDetails.title, y);
    y -= titleFontSize + lineHeight;
  
    // Ajouter l'image du projet
    const imageBytes = await fetch(`${publicRuntimeConfig.api.baseURL}/api/files/${companyDetails.logo}`).then(res => res.arrayBuffer());
    const logoImage = await pdfDoc.embedJpg(imageBytes);
    const imageSize = { width: 500, height: 200 };
    const imageX = page.getWidth() - margin - imageSize.width;
    const imageY = y - imageSize.height;
    page.drawImage(logoImage, { x: imageX, y: imageY, width: imageSize.width, height: imageSize.height });
    y -= imageSize.height + lineHeight;
  
    // Ajouter la description du projet
    addParagraph(`Description du Projet: ${companyDetails.description}`, y);
    y -= lineHeight * Math.ceil(companyDetails.description.length / 80); // Ajuster la position verticale pour les sauts de ligne
    y -= lineHeight;
  
    // Ajouter les titres et les paragraphes des rapports
    addTitle('Rapports du Projet', y);
    y -= titleFontSize + lineHeight;
  
    companyDetails.rapports.forEach((report) => {
      addTitle(report.title, y);
      y -= lineHeight;
      addParagraph(report.content, y);
      y -= lineHeight * Math.ceil(report.content.length / 80); // Ajuster la position verticale pour les sauts de ligne
      y -= lineHeight;
    });
  
    // Enregistrer le document PDF dans un fichier
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `Rapport Projet ${companyDetails.title}.pdf`;
    link.click();
  };

  const handleAddReport = () => {
    // Logique pour afficher une zone de texte ou un formulaire d'upload de fichier
    setReportData({
      // Initialiser les données du rapport, par exemple
      title: '',
      content: '', // Contenu du rapport, si vous optez pour une zone de texte
      file: null, // Fichier uploadé, si vous optez pour un upload de fichier
    });
    setIsAddingReport(true); // Activer le mode d'ajout de rapport
  };
  
  const [reports, setReports] = useState([]);
  
  const handleSaveReport = async () => {
    // Logique pour enregistrer le rapport ajouté dans la base de données ou effectuer d'autres actions nécessaires
    // Ici, vous pouvez utiliser les données du rapport stockées dans reportData
    const newReport = { ...reportData, id: uuidv4() }; // Ajouter un identifiant unique au rapport (par exemple, à l'aide de la bibliothèque uuid)
    setReports([...reports, newReport]); // Ajouter le rapport à la liste des rapports
    const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/projets/rapport/${companyDetails._id}`, {reportData})
    console.log(response);
    setIsAddingReport(false); 
    router.reload();
    // Désactiver le mode d'ajout de rapport après l'ajout
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Utilisez l'identifiant de l'entreprise pour charger ses détails depuis l'API ou votre source de données

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
