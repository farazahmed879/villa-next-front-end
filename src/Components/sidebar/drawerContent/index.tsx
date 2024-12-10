// ** Icon imports

import HomeIcon from '@mui/icons-material/Home';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';

const Navigation = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/home",
    children: [],
  }, 
  {
    title: "Clients",
    icon: <SpaceDashboardIcon />,
    path: `/panel/clients`,
  },
  
];

export default Navigation;
