import { useMutation, useQuery } from "@apollo/client";
import React, { createContext, useState, useContext } from "react";
import { UPLOAD_FILE } from "../../graphql/files";
import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  LIKE_POST,
} from "../../graphql/posts";
import Spinner from "./Components/spinner";

export const HomePageContext = createContext({});

export const useHomePageContext = () => useContext(HomePageContext);

export const HomeContainer = ({ children }) => {
  const [addPostModal, setAddPostModal] = useState(false);
  const [file, setFile] = useState(null);
  // const [postsArray, setPostsArray] = useState(null);
  const [detailedPost, setDetailedPost] = useState(false);
  const [postInfo, setPostInfo] = useState(null);
  const [searchBar, setSearchBar] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filterValues, setFilterValues] = useState(null);
  const [popOver, setPopOver] = useState(false);

  const [uploadImage] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  });

  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: (data) => console.log(data),
  });

  const [likePost] = useMutation(LIKE_POST);

  const [deletePost] = useMutation(DELETE_POST);

  const logOut = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  const {
    loading,
    error,
    data: postsData,
    refetch: refetchPosts,
  } = useQuery(GET_POSTS, { fetchPolicy: "cache-and-network" });

  if (loading) return <Spinner />;
  if (error) return `Error! ${error.message}`;
  const posts = postsData.getPosts;

  return (
    <HomePageContext.Provider
      value={{
        addPostModal,
        setAddPostModal,
        uploadImage,
        file,
        setFile,
        createPost,
        posts,
        detailedPost,
        setDetailedPost,
        postInfo,
        setPostInfo,
        logOut,
        searchBar,
        setSearchBar,
        openDrawer,
        setOpenDrawer,
        filterValues,
        setFilterValues,
        likePost,
        refetchPosts,
        popOver,
        setPopOver,
        deletePost,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};
