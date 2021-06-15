import React from "react";
import { Modal, Popover, Tag } from "antd";
import { DeleteFilled, HeartFilled } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { useHomePageContext } from "../HomeContainer";
import { GET_POST } from "../../../graphql/posts";
import Avatar from "../../../images/avatar.png";
import halalLogo from "../../../images/halal.jfif";
import locationLogo from "../../../images/location.png";
import foodLogo from "../../../images/foodIcon.png";
import { cuisine_colors } from "./helpers";

const PostModal = () => {
  const {
    detailedPost,
    setDetailedPost,
    postInfo,
    setPostInfo,
    likePost,
    popOver,
    setPopOver,
    deletePost,
    refetchPosts,
  } = useHomePageContext();

  const { data: postData } = useQuery(GET_POST, {
    variables: {
      postID: postInfo,
    },
  });

  if (!postData) {
    return (
      <Modal
        title="Basic Modal"
        visible={detailedPost}
        footer={null}
        onCancel={() => {
          setPostInfo(null);
          setDetailedPost(false);
        }}
      >
        <p>Loading...</p>
        {/* <button onClick={() => handleLikePost(id)}>Like</button> */}
      </Modal>
    );
  }

  const {
    id,
    generalLocation,
    address,
    cuisine,
    nameOfHawkerCenter,
    nameOfShop,
    nameOfFood,
    description,
    imageURL,
    // createdAt,
    likes,
    likeCount,
    username,
    isHalal,
    isAirCon,
    // type,
    price,
  } = postData?.getPost;

  let user = null;
  const rawUser = localStorage.getItem("user");
  if (rawUser) user = JSON.parse(rawUser);

  const handleLikePost = async (postID) => {
    try {
      await likePost({
        variables: {
          postID,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const checkLiked = (username) => {
    for (let i = 0; i < likes.length; i++) {
      const item = likes[i];
      if (item.username === username) {
        return true;
      }
    }
    return false;
  };

  const handleDeletePost = async (postID) => {
    try {
      await deletePost({
        variables: {
          postID: postID,
        },
      });
      refetchPosts();
      setPopOver(false);
      setDetailedPost(false);
    } catch (err) {
      console.error(err);
    }
  };

  const mq = window.matchMedia("(min-width: 768px)");

  return (
    <>
      <Modal
        title=""
        visible={detailedPost}
        footer={null}
        centered
        onCancel={() => {
          setPostInfo(null);
          setDetailedPost(false);
        }}
        closable={false}
        width={mq.matches ? 700 : 350}
        bodyStyle={{ padding: 15 }}
      >
        <div className="flex md:justify-between md:flex-row flex-col">
          {mq.matches ? null : (
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <img
                  className="ui avatar image w-8 mr-1"
                  src={Avatar}
                  alt="avatar"
                />{" "}
                <span>{username}</span>
              </div>
              {user && username === user.username ? (
                <div className="cursor-pointer">
                  <Popover
                    placement="bottomRight"
                    content={
                      <>
                        <button
                          className="hover:text-orange"
                          onClick={() => setPopOver(false)}
                        >
                          No
                        </button>
                        <button
                          className="hover:text-orange ml-4"
                          onClick={() => handleDeletePost(id)}
                        >
                          Yes
                        </button>
                      </>
                    }
                    title="Confirm Delete"
                    trigger="click"
                    visible={popOver}
                    onVisibleChange={() => setPopOver(!popOver)}
                  >
                    <DeleteFilled style={{ fontSize: 20, color: "#ff9933" }} />
                  </Popover>
                </div>
              ) : null}
            </div>
          )}

          <div className="md:w-1/2">
            <img
              className="h-48 md:h-96 w-full rounded-sm "
              src={imageURL}
              alt="food"
            />
          </div>

          <div className="md:w-1/2 md:ml-4 flex flex-col mt-2 md:mt-0">
            {!mq.matches ? null : (
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    className="ui avatar image w-8 mr-1"
                    src={Avatar}
                    alt="avatar"
                  />{" "}
                  <span>{username}</span>
                </div>
                {user && username === user.username ? (
                  <div className="cursor-pointer">
                    <Popover
                      placement="bottomRight"
                      content={
                        <>
                          <button
                            className="hover:text-orange"
                            onClick={() => setPopOver(false)}
                          >
                            No
                          </button>
                          <button
                            className="hover:text-orange ml-4"
                            onClick={() => handleDeletePost(id)}
                          >
                            Yes
                          </button>
                        </>
                      }
                      title="Confirm Delete"
                      trigger="click"
                      visible={popOver}
                      onVisibleChange={() => setPopOver(!popOver)}
                    >
                      <DeleteFilled
                        style={{ fontSize: 20, color: "#ff9933" }}
                      />
                    </Popover>
                  </div>
                ) : null}
              </div>
            )}

            <hr className="my-2 border-none h-0.5 bg-gray-300" />

            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-lg">
                  <strong>{nameOfShop}</strong>
                </span>

                {isAirCon ? (
                  <span className="text-xs text-gray-500">Air-conditioned</span>
                ) : (
                  <span className="text-xs text-gray-500">
                    Not Air-conditioned
                  </span>
                )}
              </div>

              <div className="flex items-start">
                {isHalal ? (
                  <img src={halalLogo} alt="halal" width={30} class="mx-1" />
                ) : (
                  <div clasName="m-0" />
                )}
                <div className="flex flex-col mt-1">
                  {cuisine.map((name) => {
                    return (
                      <div class="mb-0.5">
                        <Tag color={cuisine_colors[name]}>{name}</Tag>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:mt-2">
              <div className="flex items-start">
                <img src={locationLogo} alt="location" width={20} />
                <div className="my-0 ml-2">
                  <span>
                    <strong>{generalLocation}</strong>
                  </span>
                  <p className="m-0">Located in: {nameOfHawkerCenter}</p>
                  <p className="m-0">{address}</p>
                </div>
              </div>

              <div className="flex items-start mt-2 ">
                <img src={foodLogo} alt="food" width={20} />
                <div className="my-0 ml-2 w-full flex justify-between">
                  <div>
                    <span>
                      <strong>MUST TRY!!!</strong>
                    </span>
                    <p>
                      {nameOfFood} ~ ${price}
                    </p>
                  </div>
                  <div className="">
                    <a
                      href={`http://www.google.com/search?q=${nameOfShop}`}
                      className="text-blue-600 hover:text-orange"
                    >
                      Google it
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-none h-0.5 bg-gray-300" />

            <div className="mt-2 h-40 flex flex-col justify-between">
              <div className="h-full overflow-auto">{description}</div>
              <div className="flex justify-end mt-2">
                {user && checkLiked(user.username) ? (
                  <div
                    className="hover:text-orange cursor-pointer"
                    onClick={() => handleLikePost(id)}
                  >
                    UnLike
                  </div>
                ) : (
                  <div
                    className="hover:text-orange cursor-pointer"
                    onClick={() => handleLikePost(id)}
                  >
                    Like
                  </div>
                )}
                <div class="flex items-center justify-center bg-gray-300 rounded py-0 w-12 ml-2">
                  <HeartFilled
                    className="text-lg pr-1"
                    style={{
                      color: "red",
                    }}
                  />
                  {likeCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PostModal;
