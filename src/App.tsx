import { RouterProvider } from "react-router-dom";
import { Router } from "./router";
import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

function App() {

  const theme = createTheme({
    status: {
      danger: orange[500],
    },
    typography: {
      fontFamily: [
        'Roboto',//'Dancing Script',
        'cursive'
      ].join(','),
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <RouterProvider router={Router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
