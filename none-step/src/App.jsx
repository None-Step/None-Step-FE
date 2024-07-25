import { ThemeProvider } from "styled-components";
import AppRoutes from "./routes/AppRoutes";
import { theme } from "./styles/Theme";
import Login from "./pages/Login";
import SignUpForm from "./pages/SignUpForm";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <AppRoutes />
            </ThemeProvider>
        </>
    );
}

export default App;
