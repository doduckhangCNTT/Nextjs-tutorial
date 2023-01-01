import React from "react";
import Layout from "../../components/Layout";
import { Card } from "react-bootstrap";
import { getBooks } from "../../lib/books";

type TBook = {
  bookName: string;
  bookContent: string;
};

interface IProps {
  books: TBook[];
}

const Book: React.FC<IProps> = ({ books }) => {
  return (
    <Layout>
      {books.map((b, index) => {
        return (
          <Card key={index} style={{ marginTop: "5px" }}>
            <Card.Body>
              <Card.Text>{b.bookName}</Card.Text>
              <Card.Text>{b.bookContent}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const books = await getBooks();

  return {
    props: {
      books,
    },
  };
};

export default Book;
