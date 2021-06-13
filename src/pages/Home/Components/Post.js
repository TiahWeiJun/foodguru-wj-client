import React from "react";
import { Tag } from "antd";
import { useHomePageContext } from "../HomeContainer";
import { HeartFilled } from "@ant-design/icons";
import { cuisine_colors } from "./helpers";
import halalLogo from "../../../images/halal.jfif";
import locationLogo from "../../../images/location.png";
import foodLogo from "../../../images/foodIcon.png";

import moment from "moment";

const Post = ({ post }) => {
  const {
    id,
    generalLocation,
    // address,
    cuisine,
    nameOfHawkerCenter,
    nameOfShop,
    nameOfFood,
    // description,
    imageURL,
    createdAt,
    // likes,
    likeCount,
    // username,
    isHalal,
    isAirCon,
    // type,
    price,
    // filterString,
  } = post;

  const { setDetailedPost, setPostInfo } = useHomePageContext();

  const money = "$";

  return (
    <div
      class="ui card w-72 h-96 rounded-sm bg-white m-3 cursor-pointer"
      onClick={() => {
        setPostInfo(id);
        setDetailedPost(true);
      }}
    >
      {/* Top 1 */}
      <div class="flex justify-center h-60 ">
        <img class="mt-2 w-11/12 rounded-sm " src={imageURL} alt="hi" />
      </div>

      {/* Top 2 */}
      <div class="flex flex-col ml-3">
        <p className="font-bold mb-0 text-md">
          {nameOfShop}{" "}
          {nameOfHawkerCenter ? <span>- {nameOfHawkerCenter}</span> : null}
        </p>

        <div class="flex justify-between mt-1">
          <span class="text-xs ">
            {money.repeat(Math.ceil(price / 10))}{" "}
            {isAirCon ? <span>- Aircon</span> : <span>- No Aircon</span>}
          </span>
          <div class="flex justify-end text-right">
            {cuisine.map((name) => {
              return (
                <div class="mb-0.5">
                  <Tag color={cuisine_colors[name]}>{name}</Tag>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 3 */}
        <div class="flex justify-between">
          {/* Left */}
          <div class="mt-2">
            <div class="flex items-center">
              <img src={locationLogo} alt="location" width={20} />
              <p class="my-0 ml-2">{generalLocation}</p>
            </div>

            <div class="flex items-center">
              <img src={foodLogo} alt="food" width={20} />
              <p class="mt-1 mb-0 ml-2">{nameOfFood}</p>
            </div>

            <p class="text-xs mt-4 italic">
              {moment(createdAt).format("DD MMM YYYY")}
            </p>
          </div>

          {/* Right */}
          <div class="flex flex-col justify-between mr-2 pt-3">
            <div class="flex justify-end">
              {isHalal ? (
                <img src={halalLogo} alt="halal" width={30} class="mx-1" />
              ) : (
                <div clasName="m-0" />
              )}
            </div>
            <div class="flex items-center justify-end mb-2">
              <div class=" flex items-center justify-center bg-gray-300 rounded py-0 w-12">
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
    </div>
  );
};

export default Post;
