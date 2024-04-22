const { useState } = require("react")
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import SeanceBasicDetail from '../components/session_form/session_basic_info';
import SeanceBasicInfo from '../components/session_form/session_basic_info';
import ParticipationBox from '../components/session_form/participation_box';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import SummaryInfo from '../components/session_form/summary_info';

const { publicRuntimeConfig } = getConfig();



const SeanceDetail = () => {
     
     const [seance, setSeance] = useState({
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

     const fetchSeance = async (seance_id) => {
        try {
            const response = await axios.get(`${publicRuntimeConfig.api.baseURL}/api/seance/${seance_id}`);
            const result = await response.data;
            setSeance(result);
        }
        catch(error) {
            console.error('Error fetching data: ',error);
        }
     }

     useEffect(() =>{
        if(seance_id)
            fetchSeance(seance_id)
      },[]);

      const updateSeance = (newSeance) =>{
        console.log(newSeance)
        if(newSeance)
            setSeance({...newSeance})
      }

      return (
        <>
            <Head>
                <title>
                Seance | Pouapeu
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
                        <SeanceBasicInfo updateSeance={updateSeance}
                                             seance={seance} />
                        {seance._id
                         && 
                            <ParticipationBox updateSeance={updateSeance}
                                                seance={seance}
                            />}

                        {seance._id && 
                            <SummaryInfo seance={seance} />}

                        {}
                </Container>
            </Box>
        </>
      )


}

SeanceDetail.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default SeanceDetail;