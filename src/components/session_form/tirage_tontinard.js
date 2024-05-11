import { Accordion, AccordionDetails, AccordionSummary, Button, Card, Checkbox, FormControlLabel, Grid, Stack, Typography } from "@mui/material"
import { GridExpandMoreIcon } from "@mui/x-data-grid"
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import axios from "axios"
import { useState } from "react"
import { loadingAction, store } from "../../store/store";



export const TirageTontinard = (props) => {
    const {list_inscrits, beneficaire_tontine, seance_id, reload_seance} = props

    const list_eligibles = list_inscrits.map(elt => {
        elt.poids = elt.nombre_de_noms - elt.nombre_de_bouf
        elt.is_candidat = true
        return elt
    }).filter(elt => elt.poids > 0)

    const [listTirrage, setListTirrage] = useState(list_eligibles)
    const [vainqueur, setVainqueur] = useState(beneficaire_tontine)

    const startTirage = async () => {
        store.dispatch(loadingAction)
        // Calcul de la somme des poids
        const participants = listTirrage.filter(elt => elt.is_candidat)
        console.log(participants)
        const multiplicateur = 10
        // Calcul de la somme des poids multipliés par le multiplicateur
        var sommePoids = participants.reduce(function(acc, participant) {
            return acc + participant.poids * multiplicateur;
        }, 0);

        console.log("sommePoids : ", sommePoids)
        // Génération d'un nombre aléatoire entre 0 et la somme des poids
        var randomNumber = Math.floor(Math.random() * sommePoids);

        console.log("randomNumber : ", randomNumber)
        // Sélection du participant en fonction du nombre aléatoire
        var gagnant;
        var poidsAccumule = 0;
        for (var i = 0; i < participants.length; i++) {
            poidsAccumule += participants[i].poids * multiplicateur;
            if (randomNumber < poidsAccumule) {
            gagnant = participants[i];
            setVainqueur(gagnant)
            break;
            }
        }

        // Affichage du gagnant
        console.log("Le gagnant est : " + gagnant.membre.name);
        try{
            const response = await axios.put(`${publicRuntimeConfig.api.baseURL}/api/seance/${seance_id}`, {
                'beneficaire_tontine':gagnant._id
            });
            const rep = await response.data
            reload_seance()

        }catch(error){
            console.error(error)
        }

        store.dispatch(loadingAction)
    }

    const changeCandState = (index) => {
        console.log('change')
        const tmp = listTirrage
        tmp[index].is_candidat = !tmp[index].is_candidat
        setListTirrage([...tmp])
    };

    return(
        <>
            <Accordion>

                <AccordionSummary
                    expandIcon={<GridExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header">
                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                            Tirage du bouffeur de la tontine
                        </Typography>

                        
                </AccordionSummary>

                <AccordionDetails>
                    <Stack direction='column' 
                        spacing={3}>
                        <Typography>
                            Veuiller selection les membres désirant bouffer la tontine avant de démarrer le tirage  
                        </Typography>
                        <Grid container
                            rowSpacing={1} 
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            {listTirrage.map((cand,index) => {

                                
                                return(
                                    <Grid item 
                                        key={cand._id}
                                        xs={3}
                                    >
                                        <FormControlLabel 
                                            name="is_candidat"
                                            onClick={()=>changeCandState(index)}
                                            control={<Checkbox checked={cand.is_candidat}   />} 
                                            label={cand.membre.name + " "+ cand.membre.surname + " *"+cand.poids} />
                                    </Grid>
                                )
                            })}

                        </Grid>

                        {vainqueur ? <Stack border="blue">
                            <Typography variant="h6" 
                                textAlign="center">
                                Le Gagnant est : {vainqueur.membre.name +" " +vainqueur.membre.surname}
                            </Typography>
                        </Stack>
                         : <Button onClick={startTirage}
                                variant="contained">
                            Demarrer le tirrage
                        </Button>}
                    </Stack>
                </AccordionDetails>
            </Accordion>
        </>
    )

}