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
      date: '',
      submit: null
    },
    validationSchema: Yup.object({
      titre: Yup
        .string()
        .max(255)
        .required('event title is required'),
      description: Yup
        .string()
        .max(255)
        .required('event description is required'),
      date: Yup
        .date()
        .required('event date is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.AddEvent(values.titre, values.description, values.date, auth.user.id);
        router.push('/evenements');
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
                  type="textaria"
                  value={formik.values.description}
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
