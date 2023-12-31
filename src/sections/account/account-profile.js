import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useAuthContext } from '../../contexts/auth-context';


// const user = {
//   avatar: '/assets/avatars/avatar-anika-visser.png',
//   city: 'Yaounde',
//   country: 'Cameroon',
//   jobTitle: 'PDG CAMCOM',
//   name: 'Tagne August',
//   timezone: 'GTM+1'
// };
// const { users } = useAuthContext();

export const AccountProfile = () => {
  const {user} = useAuthContext();

    return(
      <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {user.name} {user.prenom}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.address.city} {user.address.country}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        ajouter une photo
      </Button>
    </CardActions>
  </Card>
    );
  
        };
