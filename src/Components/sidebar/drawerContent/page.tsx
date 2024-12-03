// ** Icon imports

import HomeIcon from "@mui/icons-material/Home";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const Navigation = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/dashboard",
    children: [],
  },
  {
    title: "Students",
    icon: <SpaceDashboardIcon />,
    path: `/students`,
  },
  {
    title: "Contact",
    icon: <MusicNoteIcon />,
    path: `/contact`,
  },
];

export default Navigation;
