import CountryCard from "../components/Country/CountryCard";
import Photos from "../components/Country/Photos";
import { Box } from "@mui/system";

const Country = () => {

  return (
    <Box sx={{ height: "100vh" }}>
      <CountryCard />
      <Photos />
    </Box>
  );
};

export default Country;
