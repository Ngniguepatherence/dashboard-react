import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import AvatarIcon from '@heroicons/react/24/solid/UserCircleIcon';
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNote  from '@mui/icons-material/EditNote';
import axios from 'axios';
const { publicRuntimeConfig } = getConfig();


export const CompanyCard = (props) => {
  const { company} = props;
  const router =  useRouter();

  const handleCardClick = () => {
    router.push(`/company-details?companyId=${company._id}`);
    console.log(company.id);
    console.log(company.title);
    console.log(company.description);
    console.log(company.responsable);
    console.log(company.logo);
  }
  const DeleteItems = async() => {
    const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/projets/delete/${company._id}`);
    console.log(response.data);
    router.push('/companies')
  }
  return (
    
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      
      
    >
      <CardContent onClick={handleCardClick}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
          }}
        >
          <Avatar
            src={`${publicRuntimeConfig.api.baseURL}/api/files/${company.logo}`}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {company.title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {company.description}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <AvatarIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            Initiateur: {company.responsable}
          </Typography>
          <EditNote />
            <Button color='error' onClick={DeleteItems} ><DeleteIcon  /></Button>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};
