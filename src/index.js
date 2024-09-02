import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import About from "./Pages/About/About";
import Products from "./Pages/Products/Products";

// prime css 
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
import 'primereact/resources/primereact.min.css';            // Core styles
import 'primeicons/primeicons.css';         // Icons


import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { ProductsDetails } from "./Pages/Products/ProductsDetails";
import { Queries } from "./Queries/Queries";
import  {InfiniteQueries}  from './Queries/InfiniteQueries';
import { NamesDetails } from "./Pages/Products/NamesDetails";
import AddUser from "./Pages/AddUser/AddUser";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products-details/:id",
    element: <ProductsDetails />,
  },
  {
    path: "/name-details/:id",
    element: <NamesDetails />,
  },
  {
    path: "/queries",
    element: <Queries />,
  },
  {
    path: "/infinite-queries",
    element: <InfiniteQueries/>,
  },
  {
    path: "/add-user",
    element: <AddUser/>,
  },

]);

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>
);
