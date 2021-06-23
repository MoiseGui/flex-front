import {RouteInfo} from './sidebar.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

  {
    path: '/dashboard', title: 'Accueil', icon: 'ft-box', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/salles', title: 'Salles', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false,
    submenu: []
  },
  {
    path: '/etudiants', title: 'etudiants', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false,
    submenu: []
  },
  {
    path: '/professeurs', title: 'Professeurs', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false,
    submenu: []
  },
  {path: '/filieres/list', title: 'Filieres', icon: 'ft-droplet', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
  {
    path: '/calendar', title: 'Emploi du temps', icon: 'ft-calendar', class: '', badge: '', badgeClass: '', isExternalLink: false,
    submenu: []
  },

  {path: '/profiles', title: 'Profiles', icon: 'ft-mail', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []},
  {
    path: '/events-special', title: 'events special', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false,
    submenu: []
  },
];
