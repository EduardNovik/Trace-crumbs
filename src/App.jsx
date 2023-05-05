import React from "react";
import { useSelector } from "react-redux";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Header from "./components/Navbar/Header";
import Home from './pages/Home'
import Country from './pages/Country'
import About from './pages/About'
import Favorites from './pages/Favorites'
import Error from "./pages/Error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Header/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/country",
        element: <Country/>,
      },
      {
        path: "/favorites",
        element: <Favorites/>,
      },
      {
        path: "/about",
        element: <About/>,
      },
      {
        path: "*",
        element: <Error/>
      }
    ]
  },
]);


function App() {

  const darkTheme = createTheme({
    palette: {
      mode: useSelector((state) => state.theme.data),
    },
  });

  const themeState = useSelector((state) => state.theme.data);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        className="App"
        bgcolor={"background.default"}
        color={"text.primary"}
        sx={{
          display:'flex',
          flex: '1 1 auto',
          flexDirection:'column',
          background: themeState === "light" ? 'linear-gradient(270deg, rgba(202,248,254,1) 22%, rgba(248,229,252,1) 98%)' : null,
        }}
      > 
        <RouterProvider router={router} /> 
      </Box>
    </ThemeProvider>
  );
}

export default App;
