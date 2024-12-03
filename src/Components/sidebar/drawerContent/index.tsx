// ** Icon imports

import HomeIcon from '@mui/icons-material/Home';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

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
