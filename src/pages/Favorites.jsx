import { Box } from '@mui/system';
import FavoriteCountriesCard from '../components/Favorites/FavoriteCountriesCard';

export default function Favorites() {

  return (
      <Box sx={{height: "100vh"}}>
        <FavoriteCountriesCard/>
      </Box>
  );
}
