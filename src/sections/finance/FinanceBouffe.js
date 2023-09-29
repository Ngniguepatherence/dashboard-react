import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SvgIcon
} from '@mui/material';

export const FinanceBouffe = (props) => {
  const { membres = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Membres Deja Bouffe" />
      <List>
        {membres.map((membre, index) => {
          const hasDivider = index < membres.length - 1;
          const ago = formatDistanceToNow(membre.updatedAt);

          return (
            <ListItem
              divider={hasDivider}
              key={membre.id}
            >
              <ListItemText
                primary={membre.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`a bouffe il y'a de cela ${ago}`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          Tout voir
        </Button>
      </CardActions>
    </Card>
  );
};

FinanceBouffe.propTypes = {
    membres: PropTypes.array,
  sx: PropTypes.object
};
