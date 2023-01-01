import Image from "next/image";
import { useRef } from "react";
import Layout from "../components/Layout";
import Video from "./videos";
import { useRouter } from "next/router";
import PostCard from "../components/post/PostCard";
import usePost from "../hooks/usePost";
import { SWRConfig } from "swr";
import axios from "axios";

type TTageVideo =
  | {
      play(): void;
      pause(): void;
    }
  | HTMLVideoElement;

export default function Home() {
  const router = useRouter();
  const { posts, error, isLoading } = usePost({ limit: 5 });
  const videoRef: React.LegacyRef<HTMLVideoElement> | TTageVideo = useRef(null);

  if (error) {
    return router.push("/");
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // ======================= Handle Video =======================
  const handlePlay = () => {
    videoRef.current?.play();
  };
  const handlePause = () => {
    videoRef.current?.pause();
  };

  return (
    <Layout>
      <Image
        src="/../static/Images/img1.jpg"
        alt="Picture of the author"
        width={1000}
        height={500}
      />

      <div className="gird grid-cols-4 gap-3 w-full">
        {posts?.map((p) => {
          return (
            <div key={p.id} className="inline-block">
              <PostCard
                image={p.thumbnailUrl}
                content={p.title}
                title={p.title}
              />
            </div>
          );
        })}
      </div>

      <div className="">
        <Video ref={videoRef} />
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
    </Layout>
  );
}
