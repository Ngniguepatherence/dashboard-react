const { useState } = require("react")
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import SaisonBasicDetail from '../components/session_form/session_basic_info';
import SaisonBasicInfo from '../components/session_form/session_basic_info';
import ParticipationBox from '../components/session_form/participation_box';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import SummaryInfo from '../components/session_form/summary_info';

const { publicRuntimeConfig } = getConfig();



const SaisonDetail = () => {
     
     const [saison, setSaison] = useState({
        date: undefined,
        session:undefined,
        beneficaire_tontine: undefined,
        beneficaire_plat: undefined,
        participations: [],
        montant_receptioniste: undefined,
        montant_demi_non_decaisse: undefined
     })

     const router = useRouter()
     const {seance_id} = router.query

     const fetchSaison = async (seance_id) => {
        try {
            const response = await axios.get(`${publicRuntimeConfig.api.baseURL}/api/saison/${seance_id}`);
            const result = await response.data;
            setSaison(result);
        }
        catch(error) {
            console.error('Error fetching data: ',error);
        }
     }

     useEffect(() =>{
        if(seance_id)
            fetchSaison(seance_id)
      },[]);

      const updateSaison = (newSaison) =>{
        console.log(newSaison)
        if(newSaison)
            setSaison({...newSaison})
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
                py: 8
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
                                    Détail de la Séance
                                </Typography>
                                
                            </Stack>
                        </Stack>
                    </Stack>
                        <SaisonBasicInfo updateSaison={updateSaison}
                                             saison={saison} />
                        {saison._id
                         && 
                            <ParticipationBox updateSaison={updateSaison}
                                                saison={saison}
                            />}

                        {saison._id && 
                            <SummaryInfo saison={saison} />}

                        {}
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