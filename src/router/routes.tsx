import { Navigate } from 'react-router-dom';
import ICONS from '../assets/icons';
import { Comparison, Main, Charts, Historical } from '../pages';

export const routes = [
  {
    path: 'main',
    component: <Main />,
    name: 'Convert',
    icon: ICONS.navigation.dollar,
  },
  {
    path: 'historical',
    component: <Historical />,
    name: 'Historical',
    icon: ICONS.navigation.history,
  },
  {
    path: 'comparison',
    component: <Comparison />,
    name: 'Comparison',
    icon: ICONS.navigation.comparison,
  },
  {
    path: 'graph',
    component: <Charts />,
    name: 'Charts',
    icon: ICONS.navigation.charts,
  },
  {
    path: '*',
    component: <Navigate to={'main'} />,
  },
];
