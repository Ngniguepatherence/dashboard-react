// pages/CompanyDetails.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from 'src/layouts/dashboard/layout'; // Importez le composant de mise en page que vous utilisez
import { Typography } from '@mui/material';


const CompanyDetails = () => {
  const router = useRouter();
  const { companyId } = router.query;

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
    <Layout>
      {/* Affichez les détails de l'entreprise ici */}
      <Typography variant="h4">{companyDetails.title}</Typography>
      <Typography>{companyDetails.description}</Typography>
      {/* ... autres détails ... */}
    </Layout>
  );
};

export default CompanyDetails;
