import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
function Sidebar(props) {
  const location = useLocation();
  // const userType = localStorage.getItem("userType");
  const userType = 'admin'

  const [isAdmin, setIsAdmin] = useState(userType == "admin");


  const activeBtn = "bg-[#364C84] text-white hover:bg-[#364C84]";
  const defaultBtn = "bg-white text-[#9FBAF1]";
  const isActive = (path) => location.pathname === path;
  return (
    <div className="w-[16vw] border h-screen hidden md:flex md:flex-col sticky left-0 top-0 bg-white">
      <div className="flex flex-col items-center my-5">
        <img src="" alt="logo" />
        <p>{props.name}</p>
      </div>
      <div className="p-3 flex flex-col h-screen  justify-between">
        <ul className="menu rounded-box">
          <Link
            to={isAdmin? `/admin`:`/Student/${localStorage.getItem("userId")}`}
            className={`btn py-2 my-1 ${
              isActive(`/Student/${localStorage.getItem("userId")}`)
                ? activeBtn
                : defaultBtn
            }`}
          >
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="icon icon-tabler icons-tabler-filled icon-tabler-layout-dashboard"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" />
              </svg>
              <span className="hidden lg:block mx-2">Dashboard</span>
            </p>
          </Link>
          <Link
            to={
              isAdmin
                ? `/Students`
                : `/profile/${localStorage.getItem("userId")}`
            }
            className={`btn py-2 my-1 ${
              isActive(
                isAdmin
                  ? `/Students`
                  : `/profile/${localStorage.getItem("userId")}`
              )
                ? activeBtn
                : defaultBtn
            }`}
          >
            {isAdmin ? (
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-users"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                </svg>
                <span className="hidden lg:block mx-2">Students</span>
              </p>
            ) : (
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-user"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
                <span className="hidden lg:block mx-2">Profile</span>
              </p>
            )}
          </Link>{" "}
          {!isAdmin && (
            <>
              <Link
                to={`/AllIdeas`}
                className={`btn py-2 my-1 ${
                  isActive("/AllIdeas") ? activeBtn : defaultBtn
                }`}
              >
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-checks"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M7 12l5 5l10 -10" />
                    <path d="M2 12l5 5m5 -5l5 -5" />
                  </svg>
                  <span className="hidden lg:block mx-2">Approved Ideas</span>
                </p>
              </Link>

              <Link
                to={`/newIdea`}
                className={`btn py-2 my-4  ${
                  isActive("/newIdea")
                    ? activeBtn
                    : "bg-[#95B1EE] text-white hover:bg-[#95B1EE]"
                }`}
              >
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                  <span className="hidden lg:block mx-2">Add New Idea</span>
                </p>
              </Link>
            </>
          )}
        </ul>
        <Link className="btn w-full text-[#FA5252]"> <p className="flex items-center"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg><span className="hidden lg:block mx-4">Logout</span> </p></Link>
      </div>
    </div>
  );
}

export default Sidebar;
