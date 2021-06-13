import React from "react";
import { useHomePageContext } from "../HomeContainer";
import { Link, useHistory } from "react-router-dom";
import DropdownMenu from "../Components/menu";
import Avatar from "../../../images/avatar.png";

const NavBar = () => {
  const { logOut, setAddPostModal, setSearchBar, searchBar } =
    useHomePageContext();

  const rawUser = localStorage.getItem("user");
  const user = JSON.parse(rawUser);

  const history = useHistory();

  const handleAddPost = () => {
    if (user) {
      setAddPostModal(true);
      return;
    }
    history.push("/auth");
  };

  return (
    <div className="flex justify-between items-center h-16 fixed left-0 top-0 z-10 w-full bg-white px-3 shadow-lg">
      <div className="flex items-center mt-2 cursor-pointer">
        <Link to="/">
          <h1 class="text-orange text-xl">Food Guru</h1>
        </Link>
      </div>

      <div class="w-2/5 h-3/5 flex items-center border-orange border-2 focus:border-orange rounded-sm">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-5 h-5 text-orange mx-2"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          placeholder="Search"
          value={searchBar}
          class=" focus:outline-none h-full w-full rounded-sm"
          onChange={(e) => setSearchBar(e.target.value)}
        />
        {/* <span class="bg-orange hover:bg-orange-dark cursor-pointer flex items-center">
         
        </span> */}
      </div>
      <div className=" hidden lg:flex lg:justify-end lg:items-center lg:w-1/6">
        <button
          class="bg-white border-2 border-orange mr-3 w-2/5 font-bold py-1 hover:bg-orange hover:text-white"
          onClick={handleAddPost}
        >
          Add Post
        </button>

        {user ? (
          <>
            <div class="flex flex-col items-center mr-3 mt-3">
              <img class="ui avatar image w-8" src={Avatar} alt="hi" />{" "}
              <p>{user?.username}</p>
            </div>
            <span
              className="text-black cursor-pointer hover:text-orange"
              onClick={() => {
                logOut();
              }}
            >
              Log Out
            </span>
          </>
        ) : (
          <Link
            className="text-black cursor-pointer hover:text-orange"
            to="/auth"
          >
            Sign In
          </Link>
        )}
      </div>
      {user ? (
        <DropdownMenu user={user} />
      ) : (
        <Link
          className="lg:hidden text-black cursor-pointer hover:text-orange"
          to="/auth"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default NavBar;
