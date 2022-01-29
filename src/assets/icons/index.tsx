import Charts from './navigation/chart';
import Dollar from './navigation/dollar';
import Comparison from './navigation/comparison';
import History from './navigation/History';
import Swap from './utils/swap';
import Arrow from './utils/arrow';

const ICONS = {
  navigation: {
    charts: <Charts />,
    dollar: <Dollar />,
    comparison: <Comparison />,
    history: <History />,
  },
  utils: {
    swap: <Swap />,
    arrow: <Arrow />,
  },
};

export default ICONS;
