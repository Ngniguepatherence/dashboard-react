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
      titre: '',
      description: '',
      concerne: '',
      adresse: '',
      date: '',
      duree: '',
      status: '',
      submit: null
    },
    validationSchema: Yup.object({
      titre: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('event title is required'),
      description: Yup
        .string()
        .max(255)
        .required('event description is required'),
      concerne: Yup
        .string()
        .max(255)
        .required('event hoster(s) is required'),
      adresse: Yup
        .string()
        .max(255)
        .required('event addresse is required'),
      date: Yup
        .date()
        .max(255)
        .required('event date is required'),
      duree: Yup
        .date()
        .max(255)
        .required('event duration is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signUp(values.titre, values.description, values.concerne, values.adresse, values.date, values.duree);
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
          Ajouter evenement | Pouapeu
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
                Ajouter des Evenements
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Ajoutez des evenements a venir pour que ce soit visible par tout les membres!
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.titre && formik.errors.titre)}
                  fullWidth
                  helperText={formik.touched.titre && formik.errors.titre}
                  label="titre"
                  name="titre"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.titre}
                />

                <TextField
                  error={!!(formik.touched.description && formik.errors.description)}
                  fullWidth
                  helperText={formik.touched.description && formik.errors.description}
                  label="description de l'evenement"
                  name="description"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="description"
                  value={formik.values.description}
                />

                <TextField
                  error={!!(formik.touched.concerne && formik.errors.concerne)}
                  fullWidth
                  helperText={formik.touched.concerne && formik.errors.concerne}
                  label="membres concerne"
                  name="concerne"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="concerne"
                  value={formik.values.concerne}
                />
                
                <TextField
                  error={!!(formik.touched.adresse && formik.errors.adresse)}
                  fullWidth
                  helperText={formik.touched.adresse && formik.errors.adresse}
                  label="adresse"
                  name="adresse"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="adresse"
                  value={formik.values.adresse}
                />

                <TextField
                  error={!!(formik.touched.date && formik.errors.date)}
                  fullWidth
                  helperText={formik.touched.date && formik.errors.date}
                  label="date"
                  name="date"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="date"
                  value={formik.values.date}
                />

                <TextField
                  error={!!(formik.touched.duree && formik.errors.duree)}
                  fullWidth
                  helperText={formik.touched.duree && formik.errors.duree}
                  label="duree"
                  name="duree"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="duree"
                  value={formik.values.duree}
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
                Ajouter l&apos;evenement
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
