import { ThemeProvider } from "styled-components";
import AppRoutes from "./routes/AppRoutes";
import { theme } from "./styles/Theme";
import Login from "./pages/Login";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                {/* <AppRoutes /> */}
                <Login></Login>
            </ThemeProvider>
        </>
    );
}

export default App;
