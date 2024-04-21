import { useEffect, useState } from "react"
import { fetchMembres } from "../../pages/addSeance"
import { Autocomplete, Box, Button, Grid, MenuItem, Select, Stack, SvgIcon, TextField } from "@mui/material"
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

import CheckIcon from '@heroicons/react/24/solid/CheckIcon';




const SeanceBasicInfo = (props) => {
    const {seance, updateSeance } = props

    const [membres, setMembres] = useState([]) 
    const [value, setValue] = useState(seance)
    const [errors, setErrors] = useState({
        date: '',
        session:'',
        beneficaire_tontine: "",
        beneficaire_plat: "",
    })

    const submitSeance = async ()=>{
        try{
            const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/seance`,value);
            const rep = await response.data
            updateSeance(rep)

        }catch(error){
            console.error(error)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValue({
          ...value,
          [name]: value,
        });
      };


    useEffect(() => {
        try{
            setMembres(fetchMembres())
          }catch(error){
            console.error(error)
          }
    }, [])

    const sessionOption = [
        {value: '2024', label:"2024"}
    ]

    return(
        <>
            <Stack padding={3} spacing={3}>
                <Grid container
                        spacing={2}
                >
                    <Grid items md={12} lg={5}>
                        <TextField
                            fullwidth
                            label="date"
                            name="date"
                            value={value.date|''}
                            onChange={handleChange}
                            error={!!errors.date}
                            helperText={errors.date}
                            />
                    </Grid>
                    <Grid items md={12} lg={5}>
                        <Select
                            fullwidth
                            label="Session"
                            name="session"
                            value={value.session|''}
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
                        <Autocomplete
                            disablePortal
                            id="bouffeur"
                            options={membres}
                            
                            getOptionLabel={(bouffeur) => {
                                if(bouffeur && bouffeur.name)
                                return  `${bouffeur.name} ${bouffeur.surname}`
                                else return ""
                            }}
                            value={value.beneficaire_tontine}
                            onChange={(event, newValue) => {
                                // setValues({
                                // ...values,
                                // beneficiaire: {
                                //     _id: newValue._id,
                                //     name: newValue.name,
                                //     surname: newValue.surname,
                                // }
                                // });
                                console.log(newValue);
                                
                            }}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                fullWidth
                                label="Bouffeur de la Tontine"
                                name="beneficaire_tontine"
                                error={!!errors.beneficaire_tontine}
                                helperText={errors.beneficaire_tontine}
                                />
                            )}
                        />
                
                    </Grid>
                    <Grid items md={12} lg={5}>
                        <Autocomplete
                            disablePortal
                            id="receptioniste"
                            options={membres}
                            
                            getOptionLabel={(receptioniste) => {
                                if(receptioniste && receptioniste.name)
                                return  `${receptioniste.name} ${receptioniste.surname}`
                                else return ""
                            }}
                            value={value.beneficaire_plat}
                            onChange={(event, newValue) => {
                                // setValues({
                                // ...values,
                                // beneficiaire: {
                                //     _id: newValue._id,
                                //     name: newValue.name,
                                //     surname: newValue.surname,
                                // }
                                // });
                                console.log(newValue);
                                
                            }}
                            renderInput={(params) => (
                                <TextField
                                {...params}
                                fullWidth
                                label="Receveur de la Tontine"
                                name="beneficaire_tontine"
                                error={!!errors.beneficaire_tontine}
                                helperText={errors.beneficaire_tontine}
                                />
                            )}
                        />
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