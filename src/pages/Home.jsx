import CountriesCard from "../components/Home/CountriesCard";
import SearchManual from "../components/Home/Search";
import { Box } from '@mui/system';

const Home = () => {

    return (
        <Box>
            <SearchManual />
            <CountriesCard/>
        </Box>
    );
};

export default Home;