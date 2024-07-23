import { ThemeProvider } from "styled-components";
import AppRoutes from "./routes/AppRoutes";
import { theme } from "./styles/Theme";

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
