import { ThemeProvider } from "styled-components";
import AppRoutes from "./routes/AppRoutes";
import { theme } from "./styles/Theme";
import { AuthProvider } from "./apis/AuthContext";

function App() {
    return (
        <>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <AppRoutes />
                </ThemeProvider>
            </AuthProvider>

        </>
    );
}

export default App;
