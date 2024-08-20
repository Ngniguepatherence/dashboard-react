import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';
import { useState } from 'react';
import ChevronDownIcon from '@heroicons/react/24/solid/ChevronDownIcon';

export const items = (roles) =>{
  const isUser = roles.includes('user');
  const isAdmin = roles.includes('admin');
  const isSuperAdmin = roles.includes('super-admin');
  const [menuOpen, setMenuOpen] = useState({
    projets: false,
    membres: false,
    finances: false,
  });

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
      ),
      iconOpen: <SvgIcon fontSize="small"><ChevronDownIcon /></SvgIcon>,
        // Utilisation de l'état local pour déterminer si le menu est ouvert
        isOpen: menuOpen.projets,
        // Fonction pour changer l'état du menu
        toggleMenu: () => setMenuOpen({ ...menuOpen, projets: !menuOpen.projets })
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
      title: 'Saison',
      path: '/saison/saisons',
      icon: (
        <SvgIcon fontSize="small">
          <XCircleIcon />
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
      ),
      iconOpen: <SvgIcon fontSize="small"><ChevronDownIcon /></SvgIcon>,
        // Utilisation de l'état local pour déterminer si le menu est ouvert
        isOpen: menuOpen.projets,
        // Fonction pour changer l'état du menu
        toggleMenu: () => setMenuOpen({ ...menuOpen, projets: !menuOpen.projets })
    },
    {
      title: 'Membres',
      path: '/customers',
      icon: (
        <SvgIcon fontSize="small">
          <UsersIcon />
        </SvgIcon>
      ),
      visible: isUser || isAdmin,
      children: [
        {
          title: 'Revenus',
          path: '/revenus',
          icon: <SvgIcon fontSize="small">{/* Icône pour les revenus */}</SvgIcon>
        },
        {
          title: 'Dépenses',
          path: '/depenses',
          icon: <SvgIcon fontSize="small">{/* Icône pour les dépenses */}</SvgIcon>
        },
        // Ajoutez d'autres sous-menus au besoin
      ]
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
          title: 'Entree/Sortie',
          path: '/transactions',
          icon: (
            <SvgIcon fontSize="small">
              {/* Icône pour les revenus */}
            </SvgIcon>
          )
        },
        {
          title: 'Seances',
          path: '/seance',
          icon: (
            <SvgIcon fontSize="small">
              {/* Icône pour les revenus */}
            </SvgIcon>
          )
        },
        {
          title: 'Sanctions',
          path: '/sanction',
          icon: (
            <SvgIcon fontSize="small">
              {/* Icône pour les dépenses */}
            </SvgIcon>
          ),
          children: [
            {
              title: 'Automatisations',
              path: '/automatisation',
              icon: (
                <SvgIcon fontSize="small">
                  {/* Icône pour les revenus */}
                </SvgIcon>
              ),
              visible: roles.includes('admin'),
            }
          ]
        },
        {
          title: 'Automatisations',
          path: '/auto_sanction',
          icon: (
            <SvgIcon fontSize="small">
              {/* Icône pour les revenus */}
            </SvgIcon>
          ),
          visible: roles.includes('admin'),
        },
        {
          title: 'Contribution Social',
          path: '/contribution_social',
          icon: (
            <SvgIcon fontSize="small">
              {/* Icône pour les dépenses */}
            </SvgIcon>
          )
        },
        {
          title: 'PRET',
          path: '/pret',
          icon: (
            <SvgIcon fontSize="small">
              {/* Icône pour les dépenses */}
            </SvgIcon>
          )
        },
        {
          title: 'TONTINE',
          path: '/tontine',
          icon: (
            <SvgIcon fontSize="small">
              {/* Icône pour les dépenses */}
            </SvgIcon>
          )
        },
        {
          title: 'PLAT',
          path: '/plat',
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
