import { HelmetProvider } from "react-helmet-async";
import { Router } from "./app/routes";
import "./App.css";

// ROUTES
function App() {
  return (
    <HelmetProvider>
      <Router />
    </HelmetProvider>
  );
}

export default App;
