import React from "react";
import Layout from "../../components/Layout";
import { Card } from "react-bootstrap";
import { GetPosts } from "../../lib/posts";
import Link from "next/link";
import { TPost } from "../../type/Typescript";
import { useRouter } from "next/router";

interface IProps {
  posts: TPost[];
}

const Post: React.FC<IProps> = ({ posts }) => {
  const router = useRouter();

  return (
    <Layout>
      <div className="">
        <button className="" onClick={() => router.back()}>
          Back
        </button>
        <button className="" onClick={() => router.reload()}>
          Reload
        </button>
      </div>

      <div className="flex gap-2 ">
        <div className="border-2 w-4/5">
          {posts &&
            posts?.map((p) => {
              return (
                <Card key={p.id} style={{ marginTop: "5px" }}>
                  <Card.Body>
                    <Card.Img
                      style={{ width: "100px", height: "100px" }}
                      variant="top"
                      src={p.thumbnailUrl}
                    />
                    <Card.Title>
                      <div id={`${p.title.split(" ", 1)}`}>{p.title}</div>
                    </Card.Title>
                    <Card.Text>
                      {p.title} Lorem Ipsum is simply dummy text of the printing
                      and typesetting industry. Lorem Ipsum has been the
                      industry s standard dummy text ever since the 1500s
                    </Card.Text>
                  </Card.Body>

                  <Link href={`/post/${p.id}`} passHref legacyBehavior>
                    <Card.Link>See more</Card.Link>
                  </Link>
                </Card>
              );
            })}
        </div>
        <div className="border-2 w-1/5">
          {posts.map((p) => {
            return (
              <div key={p.id} className="flex flex-col">
                <Link scroll={false} href={`#${p.title.split(" ", 1)}`}>
                  {p.title.split(" ", 1)}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const posts = await GetPosts(10);
  return {
    props: {
      posts,
    },
  };
};

export default Post;
