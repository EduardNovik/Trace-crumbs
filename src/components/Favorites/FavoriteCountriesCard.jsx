import React from 'react';
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FcFullTrash } from "react-icons/fc"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';
import NoCoatOfArms from '../../assets/NoCoatOfArms.png'

import { db } from '../../../firebase'
import { getDocs, collection, query, deleteDoc, doc, onSnapshot } from 'firebase/firestore';

import { useDispatch, useSelector } from "react-redux";
import { updateCountryDetailsState } from "../../rdx/countryDetailsSlice";
import { updateCountryCheckedState } from '../../rdx/countryCheckedSlice'

const FavoriteCountriesCard = () => {

  const dispatch = useDispatch();
  const [favoriteCountries, setFavoriteCountries] = useState(null);
  const profileId = useSelector(state => state.signIn.profileId)
  const countriesCheckedDataState = useSelector((state) => state.countryChecked.data)


  const countryDetailsHandler = (country) => {
    dispatch(updateCountryDetailsState(country));
  };


  const fetchFirebaseData = async () => {
    const countriesQuery = query(collection(db, 'users', profileId, 'countries'))
    const querySnapshot = await getDocs(countriesQuery)
    const firebaseCountries = querySnapshot.docs.map((item) => item.data()) 
    setFavoriteCountries(firebaseCountries)
  }

  useEffect(() => {
    if (profileId) {
      fetchFirebaseData();
    }else{
      setFavoriteCountries(null)
    }
  }, [profileId]);


  const deleteFromFavoritesHandler = (country, profileId, e) => {
    const q = query(collection(db, 'users', profileId, 'countries'))
    onSnapshot(q, (querySnapshot) => {
      const countriesArr = [];
      querySnapshot.forEach((item) => {
        item.data().cca2 === country.cca2 ? deleteDoc(doc(db, "users", profileId, 'countries', item.id)) : null
        countriesArr.push({...item.data()})
      }) 
      setFavoriteCountries(countriesArr);
    })
    dispatch(updateCountryCheckedState({...countriesCheckedDataState, [country.cca2]:e.target.checked}))
  }

  return (
    <>
      {favoriteCountries ? (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Your countires list</TableCell>
                <TableCell align="left">Country name</TableCell>
                <TableCell align="left">Capital</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{}}>
              {favoriteCountries.map((country) => (
                  <TableRow
                    key={country.name.common}
                    sx={{
                      transition: 'all 0.20s',  
                      "&:last-child td, &:last-child th": { border: 0 },
                      '&:hover':{boxShadow: "0px 0px 20px 0px dimgray"} 
                    }}
                    onClick={()=>countryDetailsHandler(country)}
                  >
                    <TableCell component="th" scope="row">
                      <img 
                        src={country.coatOfArms.png ? country.coatOfArms.png : NoCoatOfArms} 
                        alt="Coat Of Arms" 
                        style={{ maxHeight:'70px'}}
                      />
                    </TableCell>
                    <TableCell align="left"><Link to={"/country"} style={{'&:hover':{cursor:'pointer'}, textDecoration:'none', color:'inherit'}}>{country.name.common}</Link></TableCell>
                    <TableCell align="left">{country.capital[0]}</TableCell>
                    <TableCell align="left" sx={{'&:hover':{cursor:'pointer'}}} onClick={(e) => deleteFromFavoritesHandler(country, profileId, e)}><FcFullTrash style={{fontSize:'25px'}}/></TableCell>
                  </TableRow>
              ))}
            </TableBody> 
          </Table>
        </TableContainer>
      ) : (
        <Stack direction="row" sx={{justifyContent:'center', mt:'100px'}}>
          <Typography variant="h5">Please, sign in first to see your Favorites</Typography>
        </Stack>
      )}
    </>
  );
};

export default FavoriteCountriesCard;
