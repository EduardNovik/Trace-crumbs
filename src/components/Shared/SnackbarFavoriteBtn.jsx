import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';


const SnackbarFavoriteBtn = () => {

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
      const { vertical, horizontal, open } = state;
    
      const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
      };
    
      const handleClose = () => {
        setState({ ...state, open: false });
      };
    
      const buttons = (
        <React.Fragment>
            <Checkbox
              onClick={handleClick({
                vertical: "top",
                horizontal: "center",
              })}
              icon={<FavoriteBorder />}
              checkedIcon={<FavoriteBorder  sx={{ color: "rgb(96,96,96)" }} />}
              
            />
        </React.Fragment>
      );
    
      return (
        <IconButton>
          {buttons}
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            sx={{marginTop:' 60px' }}
            open={open}
            onClose={handleClose}
            message="Please, login first, so you can add countries to your favorites"
            key={vertical + horizontal}
          />
        </IconButton>
      );
};

export default SnackbarFavoriteBtn;
 