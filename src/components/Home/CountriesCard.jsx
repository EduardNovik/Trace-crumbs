import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

import { fetchCountriesAsync } from "../../rdx/countriesSlice";
import { updateCountryDetailsState } from "../../rdx/countryDetailsSlice";
import { updateCountryCheckedState } from '../../rdx/countryCheckedSlice';
import { removeFromFirestoreHandler, addToFavoritesHandler } from "../Shared/FirebaseHandlers";
import NoCoatOfArms from "../../assets/NoCoatOfArms.png";
import NavigateBtn from "../Shared/NavigateBtn";
import SnackbarFavoriteBtn from "../Shared/SnackbarFavoriteBtn";

 
export default function CountriesCard() {

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.data);
  const loading = useSelector((state) => state.countries.loading);
  const profileId = useSelector((state) => state.signIn.profileId);
  const signInData = useSelector((state) => state.signIn.data);
  const countriesCheckedDataState = useSelector((state) => state.countryChecked.data)

  const countryDetailsHandler = (country) => {
    dispatch(updateCountryDetailsState(country));
  };
  

  const countriesCheckedHandler = (country, e) => {
    dispatch(updateCountryCheckedState({...countriesCheckedDataState, [country.cca2]:e.target.checked}))
    addRemoveFavoriteCountry(country, profileId)
  }

  const addRemoveFavoriteCountry = (country, profileId) => {
    if(countriesCheckedDataState[country.cca2]){
      removeFromFirestoreHandler(country, profileId)
    }else{
      addToFavoritesHandler(country, profileId)
    }
  }

  useEffect(() => {
    const URL = "https://restcountries.com/v3.1/subregion/europe";
    dispatch(fetchCountriesAsync(URL));
  }, []);


  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "200px",
            height: "100vh",
            backgroundSize: 'cover'
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}
      {countries ? (
        <Box
          sx={{
            flexGrow: 1,
            marginTop: "50px",
            backgroundSize: 'cover',
            mb:'208px',
            padding: { xs: "10px", md: "30px" },
          }}
        >
          <NavigateBtn />
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ justifyContent: "center", mb: "204px" }}
          >
            {countries.map((country) => {
              return (
                <Grid
                  item
                  xs={2}
                  sm={2}
                  md={2}
                  key={country.cca2}
                  sx={{ position: "relative", transformOrigin: "-100px 0px" }}
                >
                  <Card
                    sx={{
                      maxWidth: 345,
                      transition: "all 0.20s",
                      "&:hover": {
                        boxShadow: "0px 0px 20px 0px dimgray",
                        transform: "scale(95%)",
                      },
                      // "&:hover": { boxShadow: "0px 0px 25px 0px lightgrey", scale:'95%' ,transformOrigin:'0 0'}
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="recipe"
                          src={country.flags.png}
                        ></Avatar>
                      }
                      title={country.name.common}
                    />
                    <Link to={"/country"}>
                      <CardMedia
                        component="img"
                        height="300"
                        sx={{ objectFit: "contain", cursor: "pointer" }}
                        image={
                          country.coatOfArms.png
                            ? country.coatOfArms.png
                            : NoCoatOfArms
                        }
                        alt="Coat of arms"
                        onClick={() => countryDetailsHandler(country)}
                      />
                    </Link>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Capital: {country.capital}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Region: {country.region}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      {signInData ? (
                        <IconButton
                          aria-label="add to favorites"
                          onClick={(e) => {countriesCheckedHandler(country, e)}}
                        >
                          <Checkbox
                            icon={<FavoriteBorder />}
                            name={country.cca2}
                            checked={countriesCheckedDataState[country.cca2]? countriesCheckedDataState[country.cca2] : false}
                            checkedIcon={<Favorite sx={{ color: "red" }} />}
                          />
                        </IconButton>
                      ) : (
                        <SnackbarFavoriteBtn />
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ) : (
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: "50px",
              height: "100vh",
            }}
          >
            There is no such country, please try again.
          </Typography>
      )}
    </>
  );
}