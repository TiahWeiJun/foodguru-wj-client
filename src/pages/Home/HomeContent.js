import React from "react";
import PostModal from "./Components/addPostModal";
import { useHomePageContext } from "./HomeContainer";
import Post from "./Components/Post";
import DetailedPost from "./Components/DetailedPost";
import NavBar from "./Components/navBar";
import { useHistory } from "react-router-dom";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import DrawerFilter from "./Components/drawer";
import SideFilter from "./Components/sideFilter";

const Home = () => {
  const { posts, searchBar, setOpenDrawer, filterValues, setAddPostModal } =
    useHomePageContext();

  const rawUser = localStorage.getItem("user");
  const user = JSON.parse(rawUser);

  const history = useHistory();

  let filteredPosts;

  filteredPosts = posts?.filter((post) => {
    if (searchBar === "") {
      return post;
    } else if (
      post.filterString.includes(searchBar.toLowerCase().replace(/\s/g, ""))
    ) {
      return post;
    }
  });

  let item;

  for (item in filterValues) {
    if (Object.keys(filterValues).length === 0) return;
    switch (item) {
      case "generalLocation":
        filteredPosts = filteredPosts.filter(
          // eslint-disable-next-line no-loop-func
          (post) => post[item] === filterValues[item]
        );
        continue;
      case "cuisine":
        filteredPosts = filteredPosts.filter(
          // eslint-disable-next-line no-loop-func
          (post) => {
            if (filterValues[item].every((val) => post[item].includes(val))) {
              return post;
            }
          }
        );
        continue;
      case "type":
        filteredPosts = filteredPosts.filter(
          // eslint-disable-next-line no-loop-func
          (post) => post[item] === filterValues[item]
        );
        continue;
      case "isHalal":
        filteredPosts = filteredPosts.filter(
          // eslint-disable-next-line no-loop-func
          (post) => post[item] === filterValues[item]
        );
        continue;
      case "isAirCon":
        filteredPosts = filteredPosts.filter(
          // eslint-disable-next-line no-loop-func
          (post) => post[item] === filterValues[item]
        );
        continue;
      //price
      default:
        filteredPosts = filteredPosts.filter(
          // eslint-disable-next-line no-loop-func
          (post) => post[item] <= filterValues[item]
        );
        continue;
    }
  }

  const handleAddPost = () => {
    if (user) {
      setAddPostModal(true);
      return;
    }
    history.push("/auth");
  };

  return (
    <div className="flex-col justify-center">
      <NavBar />

      <div class="flex xl:justify-end justify-center ">
        <SideFilter />

        <div className="flex flex-col justify-between bg-white h-full py-24 xl:ml-60 w-full">
          <div
            class="cursor-pointer flex flex-col justify-center items-center fixed left-0 top-2/4 z-10 rounded-full w-12 h-12 -m-2 xl:hidden"
            onClick={() => setOpenDrawer(true)}
          >
            <RightOutlined style={{ color: "#ff9933" }} className="text-2xl" />
          </div>
          <DrawerFilter />
          <PostModal username={user?.username} />
          <DetailedPost />
          {/* md:grid md:grid-flow-row md:grid-cols-4 md:grid-rows-3 md:gap-5 w-3/5 h-full flex flex-co */}
          <div class="flex justify-center pl-10 lg:pl-0">
            <h1 class="text-3xl">
              Get Started with <span class="text-orange">Food Guru</span>
            </h1>
          </div>
          {/* .map((post) => {
            return <Post key={post.id} post={post} />;
          }) */}
          <div className="flex flex-wrap justify-center w-full">
            {filteredPosts.length !== 0 ? (
              filteredPosts.map((post) => {
                return <Post key={post.id} post={post} />;
              })
            ) : (
              <div>No results...</div>
            )}
          </div>
          <div
            class="lg:hidden rounded-full border-2 border-orange w-10 py-2 flex items-center justify-center fixed right-4 bottom-4 z-100 bg-white shadow-2xl shadow-inner"
            onClick={handleAddPost}
          >
            {/* <div>Add</div> */}
            <PlusOutlined className="text-xl" style={{ color: "#ff9933" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
