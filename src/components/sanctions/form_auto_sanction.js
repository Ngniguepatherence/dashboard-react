import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Modal,
  Radio,
  Select,
  Stack,
  SvgIcon,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { modal_style } from "../saison/inscriptions_box";
import axios from "axios";
import getConfig from "next/config";
import { fetchMotifsSanction } from "./motifs_accordeon";
import { useRouter } from "next/router";
import { fetchSaisons } from "../session_form/session_basic_info";
import { loadingAction, store } from "../../store/store";
const { publicRuntimeConfig } = getConfig();

export const fetchAutoSanctionPossible = async () => {
  try {
    const response = await axios.get(
      `${publicRuntimeConfig.api.baseURL}/api/automatisation_sanction/automatisations_possible`
    );
    const rep = await response.data;
    return rep;
  } catch (error) {
    console.error(error);
  }
};

export const FormAutoSanction = (props) => {
  const { open, setOpenModal, autoSanction, reload, seance_id } = props;

  const router = useRouter();
  const [motifsSanctions, setMotifsSanction] = useState([]);
  const [autoSanctionsPossibles, setAutoSanctionsPossible] = useState([]);
  const [values, setValues] = useState({
    code: undefined,
    label: "",
    motif: undefined,
    actif: 'off',
    ...autoSanction,
  });

  const [errors, setErrors] = useState({
    code: "",
    label: "",
    motif: "",
    actif: "",
  });
  const submit = async () => {
    store.dispatch(loadingAction);
    try {
        console.log("submitting: ", values);
        var response = undefined;
        
        if(values._id){
            console.log('mise a jour')
            response = await axios.put(
                `${publicRuntimeConfig.api.baseURL}/api/automatisation_sanction/${values._id}`,{...values}
            );
        }
        
        else{
            console.log('creation')
            response = await axios.post(
                `${publicRuntimeConfig.api.baseURL}/api/automatisation_sanction/`,{...values}
            );
        }
        const rep = await response.data;
        setOpenModal(false);
        if (reload) reload();
    } catch (err) {
        console.error(err);
    }
    store.dispatch(loadingAction);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Change: ", value);
    setValues({
      ...values,
      [name]: value,
    });
    if(name === 'actif'){
        setValues({
            ...values,
            actif: event.target.checked
        })
    }

    console.log(values)
  };

  useEffect(() => {
    try {
      (async () => {
        setMotifsSanction(await fetchMotifsSanction());
        setAutoSanctionsPossible(await fetchAutoSanctionPossible());
      })();
    } catch (error) {
      console.error(error);
      setMotifsSanction([]);
    }
  }, []);

  useEffect(() => {
    console.log(autoSanction)
    setValues({
      code: undefined,
      label: "",
      motif: undefined,
      actif: false,
      ...autoSanction,
    });
  }, [autoSanction]);

  useEffect(() => {
    if(autoSanctionsPossibles){
        const auto = autoSanctionsPossibles.find( elt => elt.code === values.code)
        auto && setValues({
            ...values,
            label: auto.label
            
        })
    }
  }, [values.code,values, autoSanctionsPossibles]);

  // useEffect(()=>{
  //     const current_saison = saisons.find(elt => elt._id == values.saison)
  //         if(current_saison){
  //             console.log(current_saison)
  //             setInscrits(current_saison.participants)
  //         }
  // },[values.saison, saisons])

  return (
    <>
      <Modal
        keepMounted
        open={open}
        onClose={() => setOpenModal(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={modal_style}>
          <DialogTitle>
            {values._id ? "Modifier" : "Ajouter"} Une Automatisation de Sanction
          </DialogTitle>
          {/* <DialogContent>Fill in the information of the project.</DialogContent> */}
          <form>
            <Stack spacing={2}>
              {/* <FormControl>
                <FormLabel>Code</FormLabel>
                <Select
                  value={values.saison || ""}
                  fullWidth
                  labelId="saison"
                  id="saison"
                  onChange={handleChange}
                  name="saison"
                  error={!!errors.saison}
                  helperText={errors.saison}
                >
                  {saisons.map((m) => (
                    <MenuItem key={m._id} value={m._id}>
                      {m.libelle}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> */}
              <FormControl>
                <FormLabel>label</FormLabel>
                { !values._id ? (<Select
                  value={values.code || ""}
                  fullWidth
                  labelId="code"
                  id="code"
                  onChange={handleChange}
                  name="code"
                  error={!!errors.code}
                  helperText={errors.code }
                >
                  {autoSanctionsPossibles.map((m, index) => (
                    <MenuItem key={index} value={m.code}>
                      {m.label }
                    </MenuItem>
                  ))}
                </Select>):(
                    <TextField 
                        disabled
                        value={values.label}
                    />
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Motif - Cout</FormLabel>
                <Select
                  value={values.motif || ""}
                  fullWidth
                  labelId="motif"
                  id="motif"
                  onChange={handleChange}
                  name="motif"
                  error={!!errors.motif}
                  helperText={errors.motif}
                >
                  {motifsSanctions.map((m) => (
                    <MenuItem key={m._id} value={m._id}>
                      {m.libelle + " -> " + m.cout}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Etat</FormLabel>
                <Switch 
                    checked={values.actif}
                    labelId="actif"
                    id="actif"
                    onChange={handleChange}
                    name="actif"
                    error={!!errors.actif}
                    helperText={errors.actif}
                /> {values.actif?'actif':'desactif'}
              </FormControl>

              <Button type="button" onClick={submit}>
                Valider
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
};
