const { useState } = require("react")
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import SaisonBasicInfo from '../../components/saison/saison_basic_info';
import InscriptionBox from '../../components/saison/inscriptions_box';
import { loadingAction, store } from '../../store/store';

const { publicRuntimeConfig } = getConfig();



const SaisonDetail = () => {
     
     const [saison, setSaison] = useState({
        libelle: undefined,
        date_debut:undefined,
        date_fin: undefined,
        montant_contribution_social: undefined,
        montant_contribution_plat: undefined,
        montant_un_nom: undefined,
        participants: []
     })

     const router = useRouter()
     const {saison_id} = router.query

     const fetchSaison = async (saison_id) => {
        store.dispatch(loadingAction)
        try {
            const response = await axios.get(`${publicRuntimeConfig.api.baseURL}/api/saisons/${saison_id}`);
            const result = await response.data;
            setSaison(result);
        }
        catch(error) {
            console.error('Error fetching data: ',error);
        }
        store.dispatch(loadingAction)
     }

     useEffect(() =>{
        if(saison_id)
            fetchSaison(saison_id)
      },[]);

      const updateSaison = (saison_id=saison._id) =>{
        fetchSaison(saison_id)
      }

      return (
        <>
            <Head>
                <title>
                Saison | Pouapeu
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                flexGrow: 1,
                py: 2
                }}
            >
                <Container maxWidth="l">
                    <Stack spacing={3}>
                        <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Détail de la Saison
                                </Typography>
                                
                            </Stack>
                        </Stack>
                    </Stack>

                    <SaisonBasicInfo 
                        saison={saison} 
                        updateSaison={updateSaison}/>
                    
                    {saison._id && <InscriptionBox 
                                        saison={saison} 
                                        updateSaison={updateSaison} />}
                        
                </Container>
            </Box>
        </>
      )


}

SaisonDetail.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default SaisonDetail;