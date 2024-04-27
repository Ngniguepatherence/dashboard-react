import { useEffect, useState } from "react"
import { fetchMembres } from "../../pages/addSeance"
import { Autocomplete, Box, Button, Grid, MenuItem, Select, Stack, SvgIcon, TextField } from "@mui/material"
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import CheckIcon from '@heroicons/react/24/solid/CheckIcon';
import axios from "axios";
import { session } from "passport";




const SeanceBasicInfo = (props) => {
    const {seance, updateSeance } = props

    const [membres, setMembres] = useState([]) 
    const [values, setValues] = useState(seance)
    const [errors, setErrors] = useState({
        date: '',
        session:'',
        beneficaire_tontine: "",
        beneficaire_plat: "",
    })

    const submitSeance = async ()=>{
        try{
            console.log(values)
            const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/seance`, values);
            const rep = await response.data
            updateSeance(rep)

        }catch(error){
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


    useEffect(() => {
        try{
            (async () => {
                setMembres(await fetchMembres())
            })();
          }catch(error){
            console.error(error)
          }
    }, [])

    useEffect(()=>{
        if(seance._id)
            setValues({
                date: seance.date,
                beneficaire_plat: seance.beneficaire_plat._id,
                beneficaire_tontine: seance.beneficaire_tontine._id,
                session: seance.session
            })

    },[seance])

    const sessionOption = [
        {value: '2024', label:"2024"}
    ]

    return(
        <>
            <Stack padding={3} spacing={3}>
                <Grid container
                        spacing={2}
                        gap={3}
                >
                    <Grid items md={12} lg={5}>
                        Date
                        <TextField
                            fullWidth
                            name="date"
                            type="date"
                            value={values.date}
                            onChange={handleChange}
                            error={!!errors.date}
                            helperText={errors.date}
                            />
                    </Grid>
                    <Grid items md={12} lg={5}>
                        Session
                        <Select
                            fullWidth
                            labelId="session"
                            id="session"
                            name="session"
                            value={values.session || ''}
                            onChange={handleChange}
                            error={!!errors.session}
                            helperText={errors.session}
                            >
                                {sessionOption.map(opt=>(
                                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                ))}
                            </Select>
                    </Grid>
                    <Grid items md={12} lg={5}>
                        
                        Bouffeur de la Tontine
                        <Select
                            value={values.beneficaire_tontine || ''}
                            fullWidth
                            labelId="beneficaire_tontine"
                            id="beneficaire_tontine"
                            onChange={handleChange}
                            label="Bouffeur de la Tontine"
                            name="beneficaire_tontine"
                            error={!!errors.beneficaire_tontine}
                            helperText={errors.beneficaire_tontine}
                        >
                            {membres.map( m=> (
                                <MenuItem key={m._id} value={m._id}>{m.name +" "+ m.surname}</MenuItem>
                            ))}
                        </Select>
                            

                
                    </Grid>
                    <Grid items md={12} lg={5}>
                        Receveur de la Tontine
                        <Select
                            value={values.beneficaire_plat || ''}
                            fullWidth
                            labelId="beneficaire_plat"
                            id="beneficaire_plat"
                            onChange={handleChange}
                            name="beneficaire_plat"
                            error={!!errors.beneficaire_plat}
                            helperText={errors.beneficaire_plat}
                        >
                            {membres.map( m=> (
                                <MenuItem key={m._id} value={m._id}>{m.name +" "+ m.surname}</MenuItem>
                            ))}
                        </Select>
                        
                    </Grid>

                </Grid>

                <Box display="flex"
                     justifyContent="end"
                >
                    <Button variant="contained"
                            onClick={submitSeance}
                            startIcon={(
                                <SvgIcon fontSize="small">
                                  <CheckIcon />
                                </SvgIcon>
                              )}
                    >
                        Valider
                    </Button>
                </Box>
            </Stack>
        </>
    )
}

export default SeanceBasicInfo