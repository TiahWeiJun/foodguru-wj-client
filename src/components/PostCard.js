import React from "react";
import { Button, Card, Image, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

const PostCard = ({ post }) => {
  const {
    id,
    body,
    username,
    createdAt,
    likeCount,
    commentCount,
    likes,
    comments,
  } = post;

  const likePost = () => {
    console.log("hi");
  };

  const commentPost = () => {
    console.log("hi");
  };

  return (
    <Card fluid as={Link} to={`/posts/${id}`}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" basic onClick={likePost}>
          <Button color="teal">
            <Icon name="heart" />
            Like
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" basic onClick={commentPost}>
          <Button color="teal">
            <Icon name="comments" />
            Comment
          </Button>
          <Label basic color="teal" pointing="left">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
