import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CheckIcon from "@heroicons/react/24/solid/CheckIcon"
import { Badge, Box, Button, Card, Checkbox, Chip, Grid, MenuItem, Select, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Scrollbar } from 'src/components/scrollbar';
import getConfig from 'next/config';

import { useState } from "react"
import { useEffect } from 'react';
import axios from 'axios';
import { loadingAction, store } from '../../store/store';
import { fetchMembres } from '../../pages/addSeance';

const { publicRuntimeConfig } = getConfig();



const ParticipationBox =  (props) => {
    const {seance, reload_seance} = props
    const [membres, setMembres] = useState([]) 
    const [participations, setParticipations ] = useState(seance.participations)
    const [values, setValues] = useState({
        montant_receptioniste: 50000,
        montant_enchere1: 0,
        montant_enchere2: 0,
        montant_beneficiaire1: undefined,
        montant_beneficiaire2: undefined,
        // beneficaire_tontine1: 0,
        // beneficaire_tontine2: 0,
    })

    const [errors, setErrors] = useState({
        participations: {

        },
        montant_receptioniste: '',
        montant_enchere1: '',
        montant_enchere2: '',
        montant_beneficiaire1: '',
        montant_beneficiaire2: '',
        // beneficaire_tontine1: '',
        // beneficaire_tontine2: '',
    })

    useEffect(()=>{
        setParticipations(seance.participations)
        setValues({
            montant_receptioniste: seance.montant_receptioniste | 0,
            montant_enchere1: seance.montant_enchere1 | 0 ,
            montant_enchere2: seance.montant_enchere2 | 0,
            // montant_beneficiaire1: seance.montant_beneficiaire1,
            // montant_beneficiaire2: seance.montant_beneficiaire2,
            beneficaire_tontine1: seance.beneficaire_tontine1? seance.beneficaire_tontine1._id : "",
            beneficaire_tontine2: seance.beneficaire_tontine2? seance.beneficaire_tontine2._id : "",
        })

    },[seance])

    useEffect(() => {
        try{
            (async () => {
                setMembres(await fetchMembres())
                // setSaisons(await fetchSaisons())
            })();
          }catch(error){
            console.error(error)
          }
    }, [])


    const changeParticipations = (index, p) => {
        const tmp = [...participations]
        tmp[index] = p

        setParticipations([...tmp])
      };
      const handleChanges = (event) => {
        const { name, value} = event.target;
        console.log("Change")
        setValues({
          ...values,
          [name]: value,
        });
        console.log(values)
      };
    const submitParticipations = async () => {
        store.dispatch(loadingAction)
        try{
            const obj = {
                ...values,
                participations: participations.map( p => { 
                    p.presence = (p.presence ===  'on' || p.presence === true)
                    p.retardataire = (p.retardataire ===  'on' || p.retardataire === true)
                    return p
                }),

            }
            console.log("sending :", obj)
            const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/seance/${seance._id}/saveParticipations`,obj);
            const rep = await response.data

            reload_seance()
        }catch(error){
            console.error(error)
        }
        store.dispatch(loadingAction)
    }


    const optionPs = [
        {value: 0, label: "0"},
        {
            value: seance.saison.montant_contribution_social, 
            label: seance.saison.montant_contribution_social
        },
    ]

    const optionPlat = [
        {value: 0, label: "0"},
        {
            value: seance.saison.montant_contribution_plat, 
            label: seance.saison.montant_contribution_plat
        },
    ]

    return(
        <>
            <Stack direction="column"
                   spacing={3}>

                <Card>
                    <Scrollbar>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Membres
                                    </TableCell>
                                    <TableCell>
                                        Présence
                                    </TableCell>
                                    <TableCell>
                                        Retart
                                    </TableCell>
                                    <TableCell>
                                        Montant Tontiné
                                    </TableCell>
                                    <TableCell>
                                        Montant Plat
                                    </TableCell>
                                    <TableCell>
                                        Prélèvement Fond Social
                                    </TableCell>
                                    {/* <TableCell>
                                        Montant Sanction
                                    </TableCell>
                                    <TableCell>
                                        Motif Sanction
                                    </TableCell> */}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {participations.map( (participation, index) => {
                                    const handleChange = (event) => {
                                        const { name, value } = event.target;
                                        console.log(name," : ", value)
                                        changeParticipations(index, {
                                          ...participation,
                                          [name]: value,
                                        });
                                      };

                                    const is_tontinard = participation.inscrit.nombre_de_noms > 0
                                    const optionTontine = [{value: 0, label: "0"}]
                                    const montant_un_nom = seance.saison.montant_un_nom
                                    if(participation.inscrit.nombre_de_noms == 0.5)
                                        optionTontine.push({value: montant_un_nom*0.5, label: `${montant_un_nom*0.5}`})
                                    else if(participation.inscrit.nombre_de_noms >= 1){
                                        for(var i= 1; i <= participation.inscrit.nombre_de_noms; i++)
                                            optionTontine.push({value: montant_un_nom*i, label: `${montant_un_nom*i}`})
                                    }


                                    return (
                                        
                                        <TableRow key={index}>
                                            <TableCell>
                                                {participation.inscrit.membre.name +" " +participation.inscrit.membre.surname}
                                                <Chip label={`X${participation.inscrit.nombre_de_noms}`} />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox name='presence'
                                                        checked={participation.presence}
                                                        onChange={(event)=>changeParticipations(index,{...participation, presence: !participation.presence })}            
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox name="retardataire"
                                                        checked={participation.retardataire}
                                                           onChange={(event)=>changeParticipations(index,{...participation, retardataire: !participation.retardataire })}            
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth
                                                    name="montant_tontine"
                                                    value={participation.montant_tontine}
                                                    onChange={handleChange}
                                                    disabled={!is_tontinard}
                                                    error={!!errors.participations.montant_tontine}
                                                    helperText={errors.participations.montant_tontine}
                                                    >
                                                        {optionTontine.map(opt=>(
                                                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                                        ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullwidth
                                                    name="montant_plat"
                                                    value={participation.montant_plat}
                                                    onChange={handleChange}
                                                    error={!!errors.participations.montant_plat}
                                                    helperText={errors.participations.montant_plat}
                                                    >
                                                        {optionPlat.map(opt=>(
                                                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                                        ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullwidth
                                                    name="montant_prelevement_social"
                                                    value={participation.montant_prelevement_social}
                                                    disabled={is_tontinard}
                                                    onChange={handleChange}
                                                    error={!!errors.participations.montant_prelevement_social}
                                                    helperText={errors.participations.montant_prelevement_social}
                                                    >
                                                        {optionPs.map(opt=>(
                                                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                                        ))}
                                                </Select>
                                            </TableCell>
                                            
                                        </TableRow>
                                    )
                                    
                                })}
                            </TableBody>

                        </Table>
                    </Scrollbar>

                </Card>
                <Stack direction="row"
                    display='flex'
                    justifyContent='space-between'
                        padding={3}
                        spacing={3} 
                >

                    <Stack direction="column"
                            spacing={2}>

                        <Stack direction="column"
                            spacing={2}
                        >
                            
                            <Typography>
                                Bouffeur 1 de la Tontine
                            </Typography>
                            
                            <Select
                                value={values.beneficaire_tontine1 || ''}
                                fullWidth
                                labelId="beneficaire_tontine1"
                                id="beneficaire_tontine1"
                                onChange={handleChanges}
                                label="Bouffeur de la Tontine"
                                name="beneficaire_tontine1"
                                error={!!errors.beneficaire_tontine1}
                                helperText={errors.beneficaire_tontine1}
                            >
                                {participations.filter(elt => elt.inscrit.nombre_de_noms > 0 &&  elt.inscrit.nombre_de_bouf < elt.inscrit.nombre_de_noms ).map( m=> (
                                    <MenuItem key={m.inscrit._id} value={m.inscrit._id}>{m.inscrit.membre.name +" "+ m.inscrit.membre.surname}</MenuItem>
                                ))}
                            </Select>
                        </Stack>
                        <Stack direction="column"
                            spacing={2}
                        >
                                <Typography>
                                    Montant Enchère 1
                                </Typography>
                                
                                <TextField
                                    fullwidth
                                    name="montant_enchere1"
                                    type="number"
                                    value={values.montant_enchere1}
                                    onChange={handleChanges}
                                    error={!!errors.montant_enchere1}
                                    helperText={errors.montant_enchere1}
                                />
                        </Stack>
                    </Stack>
                    
                    <Stack direction="column"
                            spacing={2}>
                        <Stack direction="column"
                            spacing={2}
                        >
                            
                            <Typography>
                                Bouffeur 2 de la Tontine
                            </Typography>
                            
                            <Select
                                value={values.beneficaire_tontine2 || ''}
                                fullWidth
                                labelId="beneficaire_tontine2"
                                id="beneficaire_tontine2"
                                onChange={handleChanges}
                                label="Bouffeur de la Tontine"
                                name="beneficaire_tontine2"
                                error={!!errors.beneficaire_tontine2}
                                helperText={errors.beneficaire_tontine2}
                            >
                                {participations.filter(elt => elt.inscrit.nombre_de_noms > 0 &&  elt.inscrit.nombre_de_bouf < elt.inscrit.nombre_de_noms ).map( m=> (
                                    <MenuItem key={m.inscrit._id} value={m.inscrit._id}>{m.inscrit.membre.name +" "+ m.inscrit.membre.surname}</MenuItem>
                                ))}
                            </Select>
                        </Stack>
                        <Stack direction="column"
                            spacing={2}
                        >
                                <Typography>
                                    Montant Enchère 2
                                </Typography>
                                
                                <TextField
                                    fullwidth
                                    name="montant_enchere2"
                                    type="number"
                                    value={values.montant_enchere2}
                                    onChange={handleChanges}
                                    error={!!errors.montant_enchere2}
                                    helperText={errors.montant_enchere2}
                                />
                        </Stack>
                    </Stack>
                    

                    <Stack direction="column"
                           spacing={2}>
                            <Typography>
                                Montant décaissé au membre qui reçoit la reunion
                            </Typography>
                            
                            <TextField
                                fullwidth
                                name="montant_receptioniste"
                                type="number"
                                value={values.montant_receptioniste}
                                onChange={handleChanges}
                                error={!!errors.montant_receptioniste}
                                helperText={errors.montant_receptioniste}
                            />
                    </Stack>
                        
                </Stack>


                <Box display="flex"
                     justifyContent="end"
                >
                    <Button variant="contained"
                            color="success"
                            onClick={submitParticipations}
                            startIcon={(
                                <SvgIcon fontSize="small">
                                  <CheckIcon />
                                </SvgIcon>
                              )}
                    >
                        Enregistrer
                    </Button>
                </Box>
            </Stack>
        </>
    )
}

export default ParticipationBox;