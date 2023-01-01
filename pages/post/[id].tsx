import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { GetPostById, GetPostIds } from "../../lib/posts";
import { TJoke, TPost } from "../../type/Typescript";
import Spinner from "react-bootstrap/Spinner";
import { getRandomJoke } from "../../lib/jokes";

import dynamic from "next/dynamic";
const DynamicComponent_Random = dynamic(() => import("../jokes/random"), {
  loading: () => <p>Loading caused by client page transition ...</p>,
});

interface IProps {
  post: TPost;
}

interface I_GetStaticPaths {
  params: {
    id: string;
  };
}

const DetailPost: React.FC<IProps> = ({ post }) => {
  const router = useRouter();
  console.log("Id: ", router.query.id);
  const initialState_Joke = {
    created_at: "",
    icon_url: "",
    id: "",
    updated_at: "",
    url: "",
    value: "",
  };
  const [jokeData, setJokeData] = useState<TJoke>(initialState_Joke);

  useEffect(() => {
    const getJoke = async () => {
      const joke = await getRandomJoke();
      setJokeData(joke);
    };

    getJoke();
  }, []);

  if (router.isFallback) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <Layout>
      <div style={{ width: "500px", height: "200px" }}>
        <img src={post.thumbnailUrl} alt="" style={{ width: "200px" }} />
      </div>
      <h1>{post.title}</h1>

      <div className="">
        <DynamicComponent_Random joke={jokeData} />
      </div>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const paths = await GetPostIds(5);
  return {
    paths,
    // fallback: false, // Nếu id của post đó không tồn tại thì nó sẽ chuyển sang trang 404
    // fallback: "blocking", // Được sử dụng khi mà đường dẫn không tồn tai, nó sẽ gửi đường dẫn đó
    fallback: true, // Chơ đợi trang đang được load để lấy dữ liệu, trong khi đó sẽ hiển thị trang loading
  };
};

export const getStaticProps = async ({ params }: I_GetStaticPaths) => {
  const post = await GetPostById(params.id);

  if (!post) {
    return {
      notFound: true, // tra ve trong 404 neu ko lay duoc du lieu ve
    };

    // return {
    //   redirect: {
    //     destination: "/post",
    //     permanent: true
    //   }
    // }
  }

  return {
    props: {
      post,
    },
    revalidate: 1, // Thực hiện việc kiểm trong 1 lân/ 1s xem có dữ liệu nào có thay đổi trên database không nếu có thì nó lấy dữ liệu đó về và chuyển thành file HTML tĩnh và hiển thị ra giao diện
  };
};

export default DetailPost;
