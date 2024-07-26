import { ThemeProvider } from "styled-components";
import AppRoutes from "./routes/AppRoutes";
import { theme } from "./styles/Theme";
import Login from "./pages/Login/Login";
import SignUpForm from "./pages/SignUp/SignUpForm";

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <AppRoutes />
                {/* <Login></Login> */}
            </ThemeProvider>
        </>
    );
}

export default App;
