import React from "react";
import { Button, Card } from "react-bootstrap";

interface IProps {
  image: string;
  title: string;
  content: string;
}

const UserCard: React.FC<IProps> = ({ image, title, content }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <div className="h-[100px]">
        <Card.Img className="object-cover" variant="top" src={image} />
      </div>
      <div className="">
        <Card.Body>
          <Card.Title className="text-white">{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </div>
    </Card>
  );
};

export default UserCard;
