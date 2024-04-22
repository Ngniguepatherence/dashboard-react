import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CheckIcon from "@heroicons/react/24/solid/CheckIcon"
import { Box, Button, Card, Checkbox, MenuItem, Select, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
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
        montant_receptioniste: undefined,
        montant_demi_non_decaisse: undefined

    })
    const [errors, setErrors] = useState({
        participations: {

        },
        montant_receptioniste: '',
        montant_demi_non_decaisse: ''
    })

    useEffect(()=>{
        setParticipations(seance.participations)
        setValues({
            montant_receptioniste: seance.montant_receptioniste,
            montant_demi_non_decaisse: seance.montant_demi_non_decaisse,
        })

    },[seance])


    const changeParticipations = (index, p) => {
        const tmp = [...participations]
        tmp[index] = p

        setParticipations([...tmp])
      };
      const handleChanges = (event) => {
        const { name, val} = event.target;
        console.log("Change")
        setValues({
          ...values,
          [name]: val,
        });
      };
    const submitParticipations = async () => {
        try{
            const obj = {
                participations: participations,
                ...values
            }
            const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/seance/${seance._id}/saveParticipations`,{
                ...obj
            });
            const rep = await response.data
            updateSeance(rep)

        }catch(error){
            console.error(error)
        }
    }

    const optionTontine = [
        {value: 0, label: "0"},
        {value: 50000, label: "50 000"},
        {value: 100000, label: "100 000"},
    ]

    const optionPs = [
        {value: 0, label: "0"},
        {value: 6000, label: "6 000"},
    ]

    const optionPlat = [
        {value: 0, label: "0"},
        {value: 3000, label: "3 000"},
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
                                    <TableCell>
                                        Montant Sanction
                                    </TableCell>
                                    <TableCell>
                                        Motif Sanction
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {participations.map( (participation, index) => {
                                    const handleChange = (event) => {
                                        const { name, value } = event.target;
                                        changeParticipations(index, {
                                          ...participation,
                                          [name]: value,
                                        });
                                      };
                                    
                                    return (
                                        
                                        <TableRow key={index}>
                                            <TableCell>
                                                {participation.membre.name +" " +participation.membre.surname}
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox value={participation.presence}
                                                           onChange={handleChange}            
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox value={participation.presence}
                                                           onChange={handleChange}            
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Select 
                                                    fullWidth
                                                    name="montant_tontine"
                                                    value={participation.montant_tontine}
                                                    onChange={handleChange}
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
                                                    onChange={handleChange}
                                                    error={!!errors.participations.montant_prelevement_social}
                                                    helperText={errors.participations.montant_prelevement_social}
                                                    >
                                                        {optionPs.map(opt=>(
                                                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                                        ))}
                                                </Select>
                                            </TableCell>
                                            <TableCell>
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
                                            </TableCell>
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
                                Montant du demis nom decaissé   
                            </Typography>
                            
                            <TextField
                                fullwidth
                                name="montant_demi_non_decaisse"
                                type="number"
                                value={values.montant_demi_non_decaisse}
                                onChange={handleChanges}
                                error={!!errors.montant_demi_non_decaisse}
                                helperText={errors.montant_demi_non_decaisse}
                            />
                    </Stack>
                </Stack>


                <Box display="flex"
                     justifyContent="end"
                >
                    <Button variant="contained"
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