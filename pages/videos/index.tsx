import React, { useImperativeHandle, useRef } from "react";

type TTageVideo =
  | {
      play(): void;
      pause(): void;
    }
  | HTMLVideoElement;

// eslint-disable-next-line react/display-name
const Video = React.forwardRef<HTMLVideoElement>((props, ref) => {
  const videoRef: React.LegacyRef<HTMLVideoElement> | undefined = useRef(null);

  const handleTagVideo = {
    play() {
      videoRef.current?.play();
    },
    pause() {
      videoRef.current?.pause();
    },
  };

  useImperativeHandle(ref, (): TTageVideo | any => {
    return handleTagVideo;
  });

  return (
    <div>
      <h1>Video Youtube:</h1>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dSzf0nv6QmM"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <video
        ref={videoRef}
        src="/../static/Videos/video1.mp4"
        width="640"
        height="500"
      ></video>
    </div>
  );
});

export default Video;
