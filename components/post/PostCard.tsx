import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

interface IProps {
  image: string;
  title: string;
  content: string;
}

const PostCard: React.FC<IProps> = ({ image, title, content }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body className="dark:bg-sky-500">
        <Card.Title className="dark:text-white">{title}</Card.Title>
        <Card.Text className="dark:text-white">{content}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
