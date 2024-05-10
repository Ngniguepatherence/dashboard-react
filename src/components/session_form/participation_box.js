import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CheckIcon from "@heroicons/react/24/solid/CheckIcon"
import { Badge, Box, Button, Card, Checkbox, Chip, MenuItem, Select, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Scrollbar } from 'src/components/scrollbar';
import getConfig from 'next/config';

import { useState } from "react"
import { useEffect } from 'react';
import axios from 'axios';

const { publicRuntimeConfig } = getConfig();



const ParticipationBox =  (props) => {
    const {seance, updateSeance} = props

    const [participations, setParticipations ] = useState(seance.participations)
    const [values, setValues] = useState({
        montant_receptioniste: 50000,
        montant_beneficiaire: 0

    })
    const [errors, setErrors] = useState({
        participations: {

        },
        montant_receptioniste: '',
        montant_beneficiaire: ''
    })

    useEffect(()=>{
        setParticipations(seance.participations)
        setValues({
            montant_receptioniste: seance.montant_receptioniste,
            montant_beneficiaire: seance.montant_beneficiaire,
        })

    },[seance])


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
            updateSeance(rep)

        }catch(error){
            console.error(error)
        }
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


                                    console.log(participation)
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
                                            {/* <TableCell>
                                                <TextField
                                                    fullwidth
                                                    name="montant_sanction"
                                                    type="number"
                                                    value={participation.montant_sanction}
                                                    onChange={handleChange}
                                                    error={!!errors.participations.montant_sanction}
                                                    helperText={errors.participations.montant_sanction}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    fullwidth
                                                    name="motif_sanction"
                                                    type="text"
                                                    value={participation.motif_sanction}
                                                    onChange={handleChange}
                                                    error={!!errors.participations.motif_sanction}
                                                    helperText={errors.participations.motif_sanction}
                                                />
                                            </TableCell> */}
                                        </TableRow>
                                    )
                                    
                                })}
                            </TableBody>

                        </Table>
                    </Scrollbar>

                </Card>
                <Stack direction="row"
                        padding={3}
                        spacing={3} 
                >
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
                    <Stack direction="column"
                           spacing={2}
                    >
                            <Typography>
                                Montant decaissé au Bouffeur 
                            </Typography>
                            
                            <TextField
                                fullwidth
                                name="montant_beneficiaire"
                                type="number"
                                value={values.montant_beneficiaire}
                                onChange={handleChanges}
                                error={!!errors.montant_beneficiaire}
                                helperText={errors.montant_beneficiaire}
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