import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js';
import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";
import ForgetPassword from './components/ForgetPassword.jsx';
import ResetPassword from './components/ResetPassword.jsx';
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
     
      { path: "/", 
        element: <Home /> },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
     {
  path: "/profile",
  element: <Profile />
},
{
  path: "/profile/:username",
  element: <Profile />
},

      {
        path:"/profile/:username/edit",
        element:<EditProfile/>
      },
        
      
      {
        path:"/forgot-password",
        element:<ForgetPassword/>

      },
      {
  path: "/reset-password",
  element: <ResetPassword />,
},

      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      { path: "/post/:slug", element: <Post /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
