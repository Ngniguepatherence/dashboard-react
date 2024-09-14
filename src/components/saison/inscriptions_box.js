import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CheckIcon from "@heroicons/react/24/solid/CheckIcon"
import { Box, Button, Card, Checkbox, DialogTitle, FormControl, FormLabel, IconButton, Input, MenuItem, Modal, Select, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Scrollbar } from 'src/components/scrollbar';
import getConfig from 'next/config';
import { useState } from "react"
import { useEffect } from 'react';
import axios from 'axios';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { fetchMembres } from '../../pages/addSeance';
import { loadingAction, store } from '../../store/store';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { ArrowBack, ArrowRight, Details } from '@mui/icons-material';

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
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [current, setCurrent] = useState(undefined)
    const [values, setValues] = useState({
        membre : undefined,
        nombre_de_noms: undefined,
        nombre_de_bouf: undefined,
        fond_caisse: 0
    })
    const [errors, setErrors] = useState({
        membre : '',
        nombre_de_noms: '',
        nombre_de_bouf: '',
        fond_caisse: ''
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
        store.dispatch(loadingAction)
        try {
            console.log("sending: ",values )
            const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/saisons/${saison._id}/inscriptions`, values);
            const rep = await response.data
            updateSaison()
            setOpenModal(false)
        }catch(err){
            console.error(err)
        }
        store.dispatch(loadingAction)
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
                                        Fond de caisse
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
                                    <TableCell>
                                        Actions
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
                                                {participant.fond_caisse}
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
                                            <TableCell>
                                                <IconButton aria-label="edit" 
                                                        onClick={()=>{
                                                            setValues({
                                                                membre : participant.membre._id,
                                                                fond_caisse: participant.fond_caisse,
                                                                nombre_de_noms: participant.nombre_de_noms,
                                                                nombre_de_bouf: participant.nombre_de_bouf,
                                                            })
                                                            setCurrent(participant)
                                                            setOpenModal(true)
                                                        }}><EditIcon /></IconButton>
                                                <IconButton aria-label="delete" 
                                                        onClick={()=>{
                                                            setCurrent(participant)
                                                            setOpenDeleteModal(true)
                                                        }}><DeleteIcon /></IconButton>
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
                            onClick={()=>{
                                setValues({
                                    membre : undefined,
                                    fond_caisse: 0,
                                    nombre_de_noms: 0,
                                    nombre_de_bouf: 0
                                })
                                setCurrent(undefined)
                                setOpenModal(true)
                            }}
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
                                    {current ? <TextField disabled 
                                                value={current.membre.name +" " + current.membre.surname}/> 
                                            :<Select
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
                                    </Select>}
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Fond de caisse</FormLabel>
                                    <Input 
                                        type='number' 
                                        required
                                        onChange={handleChange}
                                        value={values.fond_caisse}
                                        name='fond_caisse'
                                        error={!!errors.fond_caisse}
                                        helperText={errors.fond_caisse} />
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