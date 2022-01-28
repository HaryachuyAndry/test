import { Navigate } from 'react-router-dom';
import ICONS from '../assets/icons';
import Chart from '../pages/Charts/Comparison';
import Comparison from '../pages/Comparison';
import Historical from '../pages/Historical';
import Main from '../pages/Main';

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
    component: <Chart />,
    name: 'Charts',
    icon: ICONS.navigation.charts,
  },
  {
    path: '*',
    component: <Navigate to={'main'} />,
  },
];
