import "./App.css";

import UserContextProvider from "./contexts/UserContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

import Routing from "./Routing";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
       <UserContextProvider>
        <CssBaseline />
        <Routing />
       </UserContextProvider>
    </ThemeProvider>
  );
}

export default App;
