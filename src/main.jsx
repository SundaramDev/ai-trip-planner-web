import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header.jsx"; // ✅ Corrected path
import { Toaster } from './components/ui/toaster';
import { GoogleOAuthProvider } from "@react-oauth/google"; // ✅ Import added
import Viewtrip from "./view-trip/index.jsx"; // ✅ Updated path
import MyTrips from "./my-trips/index.jsx"; // ✅ Ensure MyTrips is imported correctly

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/View-trip/:tripId", // ✅ Added missing comma
    element: <Viewtrip />,
  },
  {
    path: "/my-trips",
    element: <MyTrips /> // ✅ Fixed incorrect syntax
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
