import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CheckIcon from "@heroicons/react/24/solid/CheckIcon"
import { Box, Button, Card, Checkbox, DialogTitle, FormControl, FormLabel, Input, MenuItem, Modal, Select, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Scrollbar } from 'src/components/scrollbar';
import getConfig from 'next/config';
import { useState } from "react"
import { useEffect } from 'react';
import axios from 'axios';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { fetchMembres } from '../../pages/addSeance';

const { publicRuntimeConfig } = getConfig();

export const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const InscriptionBox =  (props) => {
    const {saison, updateSaison} = props

    const [membres, setMembres] = useState([]) 
    const [participants, setParticipants ] = useState(saison.participants)
    const [openModal, setOpenModal] = useState(false)
    const [values, setValues] = useState({
        membre : undefined,
        nombre_de_noms: undefined,
        nombre_de_bouf: undefined
    })
    const [errors, setErrors] = useState({
        membre : '',
        nombre_de_noms: '',
        nombre_de_bouf: ''
    })

    useEffect(() => {
        try{
            (async () => {
                setMembres(await fetchMembres())
            })();
          }catch(error){
            console.error(error)
          }
    }, [])

    const nonInscrip = (id)=> {
        for(const p of participants){
            if (p.membre._id === id) return false
        }

        return true
    }
    const submitInscription = async () => {
        try {
            console.log(values)
            const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/saisons/${saison._id}/inscriptions`, values);
            const rep = await response.data
            updateSaison(rep)
        }catch(err){
            console.error(error)
        }
    }

    const handleChange = (event) => {
        const { name, value} = event.target;
        console.log("Change")
        setValues({
          ...values,
          [name]: value,
        });

        console.log(values)
      };

    useEffect(()=>{
        setParticipants(saison.participants)
    },[saison])

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
                                        Nombre de Nom
                                    </TableCell>
                                    <TableCell>
                                        Noms déjà Bouffés
                                    </TableCell>
                                    <TableCell>
                                        Nombre de reception
                                    </TableCell>
                                    
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {participants.map( (participant, index) => {
                                    
                                    console.log(participant)
                                    return (
                                        
                                        <TableRow key={index}>
                                            <TableCell>
                                                {participant.membre.name +" " +participant.membre.surname}
                                            </TableCell>
                                            <TableCell>
                                                {participant.nombre_de_noms}
                                            </TableCell>
                                            <TableCell>
                                                {participant.nombre_de_bouf}
                                            </TableCell>
                                            <TableCell>
                                                {participant.nombre_de_reception}
                                            </TableCell>
                                        </TableRow>
                                    )
                                    
                                })}
                            </TableBody>

                        </Table>
                    </Scrollbar>

                </Card>


                <Box display="flex"
                     justifyContent="end"
                >
                    <Button variant="contained"
                            onClick={()=>setOpenModal(true)}
                            startIcon={(
                                <SvgIcon fontSize="small">
                                  <PlusIcon />
                                </SvgIcon>
                              )}
                    >
                        Ajouter
                    </Button>
                </Box>
            </Stack>

            <Modal 
                keepMounted
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description">
                    
                    <Box sx={modal_style}>
                        <DialogTitle>Inscrire un Membre</DialogTitle>
                        {/* <DialogContent>Fill in the information of the project.</DialogContent> */}
                        <form>
                            <Stack spacing={2}>
                                <FormControl>
                                    <FormLabel>Membre</FormLabel>
                                    <Select
                                        value={values.membre || ''}
                                        fullWidth
                                        labelId="membre"
                                        id="membre"
                                        onChange={handleChange}
                                        name="membre"
                                        error={!!errors.membre}
                                        helperText={errors.membre}
                                    >
                                        {membres.filter(elt => nonInscrip(elt._id)).map( m=> (
                                            <MenuItem key={m._id} value={m._id}>{m.name +" "+ m.surname}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Nombre de Noms</FormLabel>
                                    <Input 
                                        type='number' 
                                        required
                                        onChange={handleChange}
                                        value={values.nombre_de_noms}
                                        name='nombre_de_noms'
                                        error={!!errors.nombre_de_noms}
                                        helperText={errors.memnombre_de_nomsbre} />
                                </FormControl>
                                <Button t
                                    ype="button" 
                                    onClick={submitInscription}>Valider</Button>
                            </Stack>
                        </form>
                    
                    </Box>
            </Modal>
        </>
    )
}

export default InscriptionBox;