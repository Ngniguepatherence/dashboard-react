import Head from 'next/head';
import { useCallback, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createRef } from 'react';
import { Box, Link,Container,Button ,Typography,Avatar, Stack,Divider,CardActions, Card,CardHeader,CardContent,Grid, TextField} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { grey } from "@mui/material/colors";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import axios from 'axios';

const states = [
  {
    value: 'bertoua',
    label: 'Bertoua'
  },
  {
    value: 'douala',
    label: 'Douala'
  },
  {
    value: 'yaounde',
    label: 'Yaounde'
  },
  {
    value: 'bafoussam',
    label: 'Bafoussam'
  }
];
const status = [
  {
    value: 'simple',
    label: 'Adherent'
  },
  {
    value: 'user',
    label: 'Membre'
  },
  {
    value: 'admin',
    label: 'Super-Admin'
  },
  {
    value: 'super-admin',
    label: 'Administrateur'
  }
];

const StyledButton = styled(Button)`
  ${(props) => props.spacing};
`;

const UploadIcon = styled(CloudUploadIcon)`
  ${(props) => props.spacing};
`;

const DeleteIconStyled = styled(DeleteIcon)`
  ${(props) => props.spacing};
`;

const CenteredContent = styled("div")`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BigAvatar = styled(Avatar)`
  width: 190px;
  height: 190px;
  border-radius: 50px;
  margin: 12px  ${(props) => props.theme.spacing(4)}px;
  ${({ $withBorder }) =>
    $withBorder &&
    `border: 1px solid ${grey[500]};
     box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};`}
`;

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [image, _setImage] = useState(null);
  const [logo, setLogo] = useState(null);

  

  const formik = useFormik({
    initialValues: {
      Avatar: null,
      name: '',
      email: '',
      surname: '',
      phone: '',
      country: '',
      region: '',
      ville: '',
      rue: '',
      role: '',
      profession: '',
      password: '',
      passwordConfirm:'',
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(255)
        .required('name is required'),
      surname: Yup
        .string()
        .max(255)
        .required('surname is required'),
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      phone: Yup
        .string()
        .max(255)
        .required('phone is required'),
      country: Yup
        .string()
        .max(255)
        .required('country is required'),
      region: Yup
        .string()
        .max(255)
        .required('State is required'),
      ville: Yup
        .string()
        .max(255)
        .required('State is required'),
      rue: Yup
        .string()
        .max(255)
        .required('State is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      passwordConfirm: Yup
        .string()
        .max(255)
        .required('Password is required'),
      profession: Yup
        .string()
        .max(255)
        .required('Profession is required'),
      role: Yup
        .string()
        .max(255)
        .required('role is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.AddMembers(logo,values.name, values.surname,values.email, values.phone,values.country, values.region, values.ville,values.rue, values.role, values.profession, values.passwordConfirm, values.password);
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };


  
   
  const inputFileRef = createRef(null);
  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleOnChange = (event) => {
    
    if (logo) {
      setImage(URL.createObjectURL(logo));
      // formik.setFieldValue("Avatar", newImage);
    }
  };

  const uploadImageFunction = (File) => {
    console.log("Image Res::::");
    const formData = new FormData();
    formData.append("files", File);
    
    axios.post(`${publicRuntimeConfig.api.baseURL}/api/profiles/uploadImage`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(res => {
        console.log("Image Res::::", res.data.data[0].img);
        if (res.data.messsage === "Files Uploaded") {
          setLogo(res.data.data[0]?.img)

        }
      })
      .catch(err => {
        console.log("Error", err);
      });
  }
 

   const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
      
    }
    console.log(image);
  };

  return (
    <form
    autoComplete="off"
    noValidate
    onSubmit={formik.handleSubmit}
    >
      <Head>
        <title>
          Ajouter un membre | Pouapeu
        </title>
      </Head>
      <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
            Ajouter un nouvel membre
            </Typography>
          </div>
          <Typography
                color="text.secondary"
                variant="body2"
              >
                Ajoutez un nouvel membre a l&apos;association?
              </Typography>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                  <Card>
                    <CardContent>
                <CenteredContent>
      <BigAvatar
        $withBorder
        alt="Avatar"
        src={`${publicRuntimeConfig.api.baseURL}/api/avatar/${logo}`}
        imgProps={{
          style: {
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "cover",
          },
        }}
      />
         <label htmlFor="avatar-image-upload" style={{mt: 3}}>
        <StyledButton
          variant="contained"
          color="primary"
          component="span"
          spacing={{ mb: 4 , mt:3}}
          onClick={handleClick}
        >
          {image ? <DeleteIconStyled spacing={{ mr: 2 }} /> : <UploadIcon spacing={{ mr: 2 }} />}
          {image ? "Delete" : "Upload"}
        </StyledButton>
        </label>
     
      <input
        ref={inputFileRef}
        value={formik.values.Avatar}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={(e) =>{uploadImageFunction(e.target.files[0])}}
      />
     
      
    </CenteredContent>
    
   </CardContent>
      </Card>
                
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                 
                <Card>
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: 5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                 error={!!(formik.touched.name && formik.errors.name)}
                 fullWidth
                 helperText={formik.touched.name && formik.errors.name}
                  
                  label="Nom"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  required
                  type='text'
                  
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                error={!!(formik.touched.surname && formik.errors.surname)}
                helperText={formik.touched.surname && formik.errors.surname}
                  fullWidth
                  label="Prenom"
                  name="surname"
                  type='text'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.surname}
                  required
                  
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                 error={!!(formik.touched.email && formik.errors.email)}
                 helperText={formik.touched.email && formik.errors.email}
                  fullWidth
                  label="Adresse Mail"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                 
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                error={!!(formik.touched.phone && formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                  fullWidth
                  label="Numero de telephone"
                  name="phone"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  value={formik.values.phone}
                  required
                 
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  error={!!(formik.touched.profession && formik.errors.profession)}
                  fullWidth
                  helperText={formik.touched.profession && formik.errors.profession}
                  label="Profession"
                  name="profession"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.profession}
                  required
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  error={!!(formik.touched.country && formik.errors.country)}
                  fullWidth
                  helperText={formik.touched.country && formik.errors.country}
                  label="Pays"
                  name="country"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  type="text"
                  value={formik.values.country}
                  
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  error={!!(formik.touched.region && formik.errors.region)}
                  fullWidth
                  helperText={formik.touched.region && formik.errors.region}
                  label="State/Region"
                  name="region"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.region} 
                  
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                   error={!!(formik.touched.ville && formik.errors.ville)}
                   fullWidth
                   helperText={formik.touched.ville && formik.errors.ville}
                  label="Choisissez une ville"
                  name="ville"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.ville}
                  
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                   error={!!(formik.touched.role && formik.errors.role)}
                   fullWidth
                   helperText={formik.touched.role && formik.errors.role}
                  label="Definir Status"
                  name="role"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={formik.values.role}
                  
                >
                  {status.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  error={!!(formik.touched.rue && formik.errors.rue)}
                  fullWidth
                  helperText={formik.touched.rue && formik.errors.rue}
                  label="Quartier/Rue"
                  name="rue"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.rue} 
                  
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        
      </Card>
      <Card>
      <CardContent>
        <Typography
                color="text.primary"
                variant="subtitle1"
              >
                Creer un Nouveau Mot de passe
              </Typography>

              <Box sx={{ m: 2 }}>
            <Grid
              container
              spacing={1}
            >
              <TextField
                     error={!!(formik.touched.password && formik.errors.password)}
                     fullWidth
                     helperText={formik.touched.password && formik.errors.password}
                     label="Entrez un nouveau mot de passe"
                     name="password"
                     type="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.password}
                  
                />
              <TextField
                     error={!!(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
                     fullWidth
                     helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                     label="Entrez un nouveau mot de passe"
                     name="passwordConfirm"
                     type="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  required
                  value={formik.values.passwordConfirm}
                  
                />
                
                
              
              
              </Grid>
              </Box>
        </CardContent>
        <Divider />
        
        <CardActions sx={{ justifyContent: 'flex-end' }}>
        {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
          <Button variant="contained" type='submit'>
            Sauvegarder les details
          </Button>
          
        </CardActions>
      </Card>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
    </form>
  );
};


Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default Page;
