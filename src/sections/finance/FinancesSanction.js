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
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';

export const FinancesSanction = (props) => {
  const { orders = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Bilan des dettes pour les sanctions par membre" />
      <List>
        {orders.map((sanction, index) => {
          const hasDivider = index < orders.length - 1;
          const ago = formatDistanceToNow(sanction.createdAt);

          return (
            <ListItem
              divider={hasDivider}
              key={sanction.id}
            >
              <ListItemText
                primary={sanction.customer.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Total Dette Sanction: ${sanction.amount} F CFA`}
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

FinancesSanction.propTypes = {
  sanctions: PropTypes.array,
  sx: PropTypes.object
};
