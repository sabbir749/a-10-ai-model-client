import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import AllModels from "../Pages/AllModels/AllModels";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Registration";
import PrivateRoute from "./PrivateRoute";
import AddModel from "../Pages/AddModel/AddModel";
import ModelDetails from "../Pages/ModelDetails/ModelDetails";
import UpdateModel from "../Pages/UpdateModel/UpdateModel";
import MyModels from "../Pages/MyModels/MyModels";
import MyPurchase from "../Pages/MyPurchase/MyPurchase";
import ErrorPage from "../components/ErrorPage";
import PurchasedDetails from "../components/PurchasedDetails";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch('https://a-10-ai-model-server.vercel.app/latest-models')
      },
      {
        path: "/all-models",
        element: <AllModels />,
        loader: () => fetch('https://a-10-ai-model-server.vercel.app/models')
      },

      {
        path: "/add-model",
        element: (
          <PrivateRoute>
            <AddModel />
          </PrivateRoute>
        ),
      },
      {
        path: "/model-details/:id",
        element: (
          <PrivateRoute>
            <ModelDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/my-models",
        element: (
          <PrivateRoute>
            <MyModels />
          </PrivateRoute>
        ),
      },

      {
        path: "/my-downloads",
        element: (
          <PrivateRoute>
            <MyPurchase />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-downloads-details/:id",
        element: (
          <PrivateRoute>
            <PurchasedDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/update-model/:id",
        element: (
          <PrivateRoute>
            <UpdateModel />
          </PrivateRoute>
        ),
        // loader: ({ params }) => fetch(`https://a-10-ai-model-server.vercel.app/models/${params.id}`)
      },
      {
        path: "/auth/login",
        element:

          <Login />
        ,
      },
      {
        path: "/auth/register",
        element:
          <Register />
        ,
      },
    ],
  },
]);
