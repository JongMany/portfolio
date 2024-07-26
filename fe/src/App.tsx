import { HelmetProvider } from "react-helmet-async";
import { Router } from "./app/routes";
import "./App.css";
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
