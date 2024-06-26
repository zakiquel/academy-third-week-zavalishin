import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './app/styles/index.scss'

import App from "./app/App";

import { StoreProvider } from "@/app/providers/StoreProvider";
import { ThemeProvider } from "@/app/providers/ThemeProvider";

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'Контейнер root не найден. Не удалось вмонтировать реакт приложение.',
  );
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </BrowserRouter>
)