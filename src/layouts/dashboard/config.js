import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';


export const items = (roles) =>{
  const isUser = roles.includes('user');
  console.log(isUser);

  return [
   

  ...isUser ? [
    {
      title: 'Accueil',
      path: '/',
      icon: (
        <SvgIcon fontSize="small">
          <ChartBarIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Projets',
      path: '/companies',
      icon: (
        <SvgIcon fontSize="small">
          <ShoppingBagIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Membres',
      path: '/customerM',
      icon: (
        <SvgIcon fontSize="small">
          <UsersIcon />
        </SvgIcon>
      ),
      visible: roles.includes('user') || roles.includes('admin'),
    },
    {
      title: 'Finances',
      path: '/finances',
      icon: (
        <SvgIcon fontSize="small">
          <XCircleIcon />
        </SvgIcon>
      ),
      visible: roles.includes('user') || roles.includes('admin'),
    },
    {
      title: 'Evenements',
      path: '/evenements',
      icon: (
        <SvgIcon fontSize="small">
          <XCircleIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Compte',
      path: '/account',
      icon: (
        <SvgIcon fontSize="small">
          <UserIcon />
        </SvgIcon>
      )
    },
  ] : [
    {
      title: 'Accueil',
      path: '/',
      icon: (
        <SvgIcon fontSize="small">
          <ChartBarIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Projets',
      path: '/companies',
      icon: (
        <SvgIcon fontSize="small">
          <ShoppingBagIcon />
        </SvgIcon>
      )
    },
    {
      title: 'Membres',
      path: '/customers',
      icon: (
        <SvgIcon fontSize="small">
          <UsersIcon />
        </SvgIcon>
      ),
      visible: roles.includes('user') || roles.includes('admin'),
    },
    {
      title: 'Evenements',
      path: '/evenements',
      icon: (
        <SvgIcon fontSize="small">
          <XCircleIcon />
        </SvgIcon>
      )
    }, 
    {
      title: 'Finances',
      path: '/finances',
      icon: (
        <SvgIcon fontSize="small">
          <XCircleIcon />
        </SvgIcon>
      ),
      visible: roles.includes('user') || roles.includes('admin'),
      children: [
        {
          title: 'Revenus',
          path: '/revenus',
          icon: (
            <SvgIcon fontSize="small">
              {/* Icône pour les revenus */}
            </SvgIcon>
          )
        },
        {
          title: 'Dépenses',
          path: '/depenses',
          icon: (
            <SvgIcon fontSize="small">
              {/* Icône pour les dépenses */}
            </SvgIcon>
          )
        },
        // Ajoutez d'autres sous-menus au besoin
      ]
    },
    {
      title: 'Compte',
      path: '/account',
      icon: (
        <SvgIcon fontSize="small">
          <UserIcon />
        </SvgIcon>
      )
    },
  {
    title: 'Parametres',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  }
  ]
  
  
  
]
};
