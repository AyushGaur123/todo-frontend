
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./componants/Navbar";
import Login from "./componants/Login";
import Signup from "./componants/Signup";
import TodoPage from "./componants/TodoPage"; 
import About from "./componants/About";
import Services from "./componants/Services";
import Verify from "./componants/Verify"
import Forget from "./componants/Forget";
import Reset from "./componants/Reset";

const Layout=()=> {
  return (
    <>
      <Navbar />

          <Outlet />
      

    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <TodoPage /> }, 
        { path: "/login", element: <Login /> }, 
        {path:"/signup",element:<Signup/>},
        {path:"/about",element:<About/>},
        {path:"/services",element:<Services/>},
        {path:"/verify",element:<Verify/>},
        {path:"/forgot-password",element:<Forget/>},
        {path:"/reset-password",element:<Reset/>},
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
