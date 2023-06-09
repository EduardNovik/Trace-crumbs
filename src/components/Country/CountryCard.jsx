import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Checkbox from '@mui/material/Checkbox';
import Favorite from '@mui/icons-material/Favorite';

import { useDispatch, useSelector } from 'react-redux'
import NoCoatOfArms from '../../assets/NoCoatOfArms.png'

import SnackbarFavoriteBtn from '../Shared/SnackbarFavoriteBtn';
import { removeFromFirestoreHandler, addToFavoritesHandler } from "../Shared/FirebaseHandlers";
import { updateCountryCheckedState } from '../../rdx/countryCheckedSlice'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
}));



export default function CountryCard() {

  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch()
  const country = useSelector(state => state.countryDetails.data)
  const profileId = useSelector(state => state.signIn.profileId)
  const signInData = useSelector(state => state.signIn.data)
  const countriesCheckedDataState = useSelector((state) => state.countryChecked.data)
 

  const handleExpandClick = () => {
    setExpanded(!expanded)
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

  
  return (
    country && (
      <Card
        sx={{
          maxWidth: 345,
          m: "0px auto",
          mt: "100px",
          transition: "all 0.20s",
          "&:hover": {
            boxShadow: "0px 0px 20px 0px dimgray",
            transform: "scale(0.95)",
          },
        }}
      >
        <CardHeader
          avatar={<Avatar aria-label="recipe" src={country.flags.png}></Avatar>}
          title={country.name.common}
        />
        <CardMedia
          component="img"
          height="300"
          sx={{ objectFit: "contain" }}
          image={country.coatOfArms.png ? country.coatOfArms.png : NoCoatOfArms}
          alt="Coat of arms"
        />
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
                name={country.cca2}
                checked={countriesCheckedDataState[country.cca2]? countriesCheckedDataState[country.cca2] : false}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
              />
            </IconButton>
          ) : (
            <SnackbarFavoriteBtn />
          )}
          <ExpandMore
            expand={expanded}
            onClick={() => handleExpandClick()}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Details:</Typography>
            <Typography paragraph>
              Currencies:{" "}
              {country.currencies
                ? Object.values(country.currencies).map(
                    (currency) => currency.name + " "
                  )
                : "No information"}
            </Typography>
            <Typography paragraph>
              Languages:{" "}
              {Object.values(country.languages).map((language) =>
                Object.values(country.languages).indexOf(language) ===
                Object.values(country.languages).length - 1
                  ? language
                  : language + ", "
              )}
            </Typography>
            <Typography paragraph>Population: {country.population}</Typography>
            <Typography>Area: {country.area} km²</Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
  );
  }
