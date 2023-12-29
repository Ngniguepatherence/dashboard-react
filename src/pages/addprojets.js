import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      responsable: '',
      logo: '',
      dateinit: '',
      title: '',
      description: '',
      responsable: '',
      logo: '',
      dateinit: '',
      submit: null
    },
    validationSchema: Yup.object({
      title: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      name: Yup
        .string()
        .max(255)
        .required('you must add a description to this project'),
      responsable: Yup
        .required('you must add a description to this project'),
      responsable: Yup
        .string()
        .max(255)
        .required('some one needs to be in charge'),
      logo: Yup
        .required('some one needs to be in charge'),
      logo: Yup
        .string()
        .max(255)
        .required('add a logo for this poject'),
      dateinit: Yup
        .required('add a logo for this poject'),
      dateinit: Yup
        .string()
        .max(255)
        .required('the initialization date is needed')
        .required('the initialization date is needed')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signUp(values.title, values.description, values.responsable, values.logo, values.dateinit);
        await auth.signUp(values.title, values.description, values.responsable, values.logo, values.dateinit);
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>
        Ajouter membre | Pouapeu
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
              Ajouter un Membre
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Ajoutez un nouvel membre a l&apos;association?
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.title)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.title}
                  label="title"
                  name="title"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />

                <TextField
                  error={!!(formik.touched.description && formik.errors.description)}
                  fullWidth
                  helperText={formik.touched.description && formik.errors.description}
                  label="description du projet"
                  name="description"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.description}
                />

                <TextField
                  error={!!(formik.touched.responsable && formik.errors.responsable)}
                  fullWidth
                  helperText={formik.touched.responsable && formik.errors.responsable}
                  label="responsable du projet"
                  name="responsable"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="tel"
                  value={formik.values.responsable}
                />
                
                <TextField
                  error={!!(formik.touched.logo && formik.errors.logo)}
                  fullWidth
                  helperText={formik.touched.logo && formik.errors.logo}
                  label="logo"
                  name="logo"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="file"
                  value={formik.values.logo}
                />

                <TextField
                  error={!!(formik.touched.date && formik.errors.date)}
                  fullWidth
                  helperText={formik.touched.date && formik.errors.date}
                  label="date d'initialisation"
                  name="date"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="date"
                  value={formik.values.date}
                />
               
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Ajouter
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};


Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);

export default Page;
