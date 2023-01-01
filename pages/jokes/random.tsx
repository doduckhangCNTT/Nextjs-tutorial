import React from "react";
import Layout from "../../components/Layout";
import { getRandomJoke } from "../../lib/jokes";
import { Card } from "react-bootstrap";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { TJoke } from "../../type/Typescript";

const Random = ({
  joke,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <Card key={joke.id} style={{ marginTop: "5px" }}>
        <Card.Body>
          <Card.Text>{joke.value}</Card.Text>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{ joke: TJoke }> = async ({
  req,
  res,
}) => {
  const joke = await getRandomJoke();
  // Cache
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      joke,
    },
  };
};

export default Random;
