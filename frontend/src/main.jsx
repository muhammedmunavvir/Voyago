import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const QueryClientnew = new QueryClient();
createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Provider store={store}>
      <QueryClientProvider client={QueryClientnew}>
        <StrictMode>
          <App />
        </StrictMode>
      </QueryClientProvider>
    </Provider>
  </HashRouter>
);
