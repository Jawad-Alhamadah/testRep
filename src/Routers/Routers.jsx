import { createBrowserRouter } from "react-router-dom";
import AdminHomepage from "../pages/AdminHomepage";
import AdminStudentPage from "../pages/AdminStudentPage";
import AdminIdeaPage from "../Pages/AdminIdeaPage";

import StudentHomePage from "../Pages/StudentHomePage";
import AllIdeasPage from "../Pages/AllIdeasPage";
import IdeaPage from "../Pages/IdeaPage";
import MyIdeasPage from "../Pages/StudentProfile";
import NewIdea from "../Pages/NewIdea";
import StudentProfile from "../Pages/StudentProfile";
// import AdminHomepage from "../pages/AdminHomepage";
// import AdminStudentPage from "../pages/StudentPage";
const Routers = createBrowserRouter([
  {
    path:"/admin",
    element:<AdminHomepage/>
  }
  ,{
    path:"/admin/student/:id",
    element:<AdminStudentPage/>
  },{
    path:"/admin/idea/:id",
    element:<AdminIdeaPage/>
  },
  {
    path:"/admin",
    element:<AdminHomepage/>
  }
  ,{
    path:"/Admin/student/:id",
    element:<AdminStudentPage/>
    },
  {
    path: "/Student/:id",
    element: <StudentHomePage></StudentHomePage>
  },
  {
    path: "/AllIdeas",
    element: <AllIdeasPage></AllIdeasPage>
  },
  {
    path: "/Idea/:id",
    element: <IdeaPage></IdeaPage>
  },
  {
    path: "/profile/:id",
    element: <StudentProfile></StudentProfile>
  },
  {
    path: "/newIdea",
    element: <NewIdea></NewIdea>
  }
]);

export default Routers;
