import PropTypes from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import AvatarIcon from '@heroicons/react/24/solid/UserCircleIcon';
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNote  from '@mui/icons-material/EditNote';
import axios from 'axios';
import getConfig from 'next/config';
import { Edit } from '@mui/icons-material';
const { publicRuntimeConfig } = getConfig();


export const CompanyCard = (props) => {
  const { company} = props;
  const router =  useRouter();

  const handleCardClick = () => {
    router.push(`/company-details?companyId=${company._id}`);
  }
  const EditItems = () => {
    router.push(`/company-edit?ProjetId=${company._id}`);
  }
  const DeleteItems = async() => {
    const response = await axios.post(`${publicRuntimeConfig.api.baseURL}/api/projets/delete/${company._id}`);
    console.log(response.data);
    router.reload();
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
          {/* <Button color='black' onClick={EditItems}> <EditNote  /></Button> */}
          <Button onClick={EditItems}> <Edit color='white'/></Button>
            <Button color='error' onClick={DeleteItems} ><DeleteIcon  /></Button>
        </Stack>
      </Stack>
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};
