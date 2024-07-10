import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROOT } from "./routes/ROOT";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
function App() {
  const rooter = createBrowserRouter(ROOT);

  return (
    <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={rooter} /></LocalizationProvider>
    </>
  )
}

export default App
