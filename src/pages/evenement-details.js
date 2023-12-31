import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Button, Link,Tab, Tabs, Stack, TextField, Typography, Card, CardActionArea, CardMedia, CardHeader, Divider } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import NextLink from 'next/link';
import * as React from 'react';

const CompanyDetails = () => {
  const router = useRouter();
  const { companyId } = router.query;

  // Utilisez l'identifiant de l'entreprise pour charger ses détails depuis l'API ou votre source de données
  const [companyDetails, setCompanyDetails] = useState(null);

  const fetchCompanyDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${companyId}`);
      const data = await response.json();
      console.log(data);
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
      {/* Affichez les détails de l'entreprise ici */}
      <Typography variant="h4">{companyDetails.title}</Typography>
      <Typography>{companyDetails.description}</Typography>
      {/* ... autres détails ... */}
    </>
  );
};
CompanyDetails.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CompanyDetails;
