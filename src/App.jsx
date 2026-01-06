import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Root from "./config/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ParticipantProvider } from "./context/ParticipantContext";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <ParticipantProvider>
          <AuthProvider>
            <Root />
          </AuthProvider>
        </ParticipantProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
