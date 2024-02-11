import { RouterProvider } from "react-router-dom";
import { Router } from "./router";
import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import Calendar3 from "./components/calendar3";
import useCalendar from "./components/calendar3/useCalendar";
import {useEffect} from "react";
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

function App() {
  return (
    <div>
      <RouterProvider router={Router} />
    </div>
  );
}

export default App;
