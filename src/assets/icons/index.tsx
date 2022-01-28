import Charts from './navigation/chart';
import Dollar from './navigation/dollar';
import Comparison from './navigation/comparison';
import History from './navigation/History';
import Swap from './utils/swap';

const ICONS = {
  navigation: {
    charts: <Charts />,
    dollar: <Dollar />,
    comparison: <Comparison />,
    history: <History />,
  },
  utils: {
    swap: <Swap />,
  },
};

export default ICONS;
