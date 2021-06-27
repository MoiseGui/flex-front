import {Routes, RouterModule} from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'etudiants',
    loadChildren: () => import('../../components/etudiant/etudiant.module').then(m => m.EtudiantModule)
  },
  {
    path: 'salles',
    loadChildren: () => import('../../components/salle/salle.module').then(m => m.SalleModule)
  },
  {
    path: 'filieres',
    loadChildren: () => import('../../components/filiere/filiere.module').then(m => m.FiliereModule)
  },
  {
    path: 'profiles',
    loadChildren: () => import('../../components/profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: 'professeurs',
    loadChildren: () => import('../../components/professeur/professeur.module').then(m => m.ProfesseurModule),
  },
  {
    path: 'periodes',
    loadChildren: () => import('../../components/periode/periode.module').then(m => m.PeriodeModule),
  },
  {
    path: 'repetitions',
    loadChildren: () => import('../../components/repetition/repetition.module').then(m => m.RepetitionModule),
  },

  {
    path: 'calendar',
    loadChildren: () => import('../../components/calendar/calendar.module').then(m => m.CalendarsModule),
  },
  // {
  //   path:'dispatcher',
  //    loadChildren:()=> import('../../components/dispatcher/dispatcher.module').then(m=>m.DispatcherModule),
  // },
  /* {
     path: 'calendar',
     loadChildren: () => import('../../calendar/calendar.module').then(m => m.CalendarsModule)
   },
=======
 {
    path: 'calendar',
    loadChildren: () => import('../../components/calendar/calendar.module').then(m => m.CalendarsModule)
  },
  /* {
    path: 'charts',
    loadChildren: () => import('../../charts/charts.module').then(m => m.ChartsNg2Module)
  },
>>>>>>> 8480239faa44f0bd8ed5c469b21ff61414684983
   {
     path: 'charts',
     loadChildren: () => import('../../charts/charts.module').then(m => m.ChartsNg2Module)
   },
    {
     path: 'forms',
     loadChildren: () => import('../../forms/forms.module').then(m => m.FormModule)
   },
   {
     path: 'maps',
     loadChildren: () => import('../../maps/maps.module').then(m => m.MapsModule)
   },
   {
     path: 'tables',
     loadChildren: () => import('../../tables/tables.module').then(m => m.TablesModule)
   },
   {
     path: 'datatables',
     loadChildren: () => import('../../data-tables/data-tables.module').then(m => m.DataTablesModule)
   },
   {
     path: 'uikit',
     loadChildren: () => import('../../ui-kit/ui-kit.module').then(m => m.UIKitModule)
   },
   {
     path: 'components',
     loadChildren: () => import('../../components/ui-components.module').then(m => m.UIComponentsModule)
   },
   {
     path: 'pages',
     loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
   },
   {
     path: 'cards',
     loadChildren: () => import('../../cards/cards.module').then(m => m.CardsModule)
   },
   {
     path: 'colorpalettes',
     loadChildren: () => import('../../color-palette/color-palette.module').then(m => m.ColorPaletteModule)
   },
   {
     path: 'chat',
     loadChildren: () => import('../../chat/chat.module').then(m => m.ChatModule)
   },
   {
     path: 'chat-ngrx',
     loadChildren: () => import('../../chat-ngrx/chat-ngrx.module').then(m => m.ChatNGRXModule)
   },
   {
     path: 'inbox',
     loadChildren: () => import('../../inbox/inbox.module').then(m => m.InboxModule)
   },
   {
     path: 'taskboard',
     loadChildren: () => import('../../taskboard/taskboard.module').then(m => m.TaskboardModule)
   },
   {
     path: 'taskboard-ngrx',
     loadChildren: () => import('../../taskboard-ngrx/taskboard-ngrx.module').then(m => m.TaskboardNGRXModule)
   },
   {
     path: 'player',
     loadChildren: () => import('../../player/player.module').then(m => m.PlayerModule)
    }*/
];
