import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Auth from './Auth/Auth';
import Dashboard from './Dashboard/Dashboard';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path:'/dashboard',
      element:<Dashboard/>
    }
  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
