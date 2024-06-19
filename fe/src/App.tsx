import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import { Router } from "./routes";
// import.meta.env.VITE_API_SERVER

// ROUTES
function App() {
  return (
    <HelmetProvider>
      <Router />
    </HelmetProvider>
  );
}

export default App;
