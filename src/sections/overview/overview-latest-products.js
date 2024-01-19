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
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { useState,useEffect } from 'react';

export const OverviewLatestProducts = (props) => {
  const { products = [], sx } = props;
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${publicRuntimeConfig.api.baseURL}/api/events`);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card sx={sx}>
      <CardHeader title="Evenements recents" />
      <List>
        {events.map((product, index) => {
          const hasDivider = index < events.length - 1;
          // const ago = formatDistanceToNow(product.da);

          return (
            <ListItem
              divider={hasDivider}
              key={index}
            >
              <ListItemAvatar>
                {
                  product.image
                    ? (
                      <Box
                        component="img"
                        src={`${publicRuntimeConfig.api.baseURL}/api/files/${product.image}`}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={product.title}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`termine il y'a de cela ${0} jours`}
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

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
