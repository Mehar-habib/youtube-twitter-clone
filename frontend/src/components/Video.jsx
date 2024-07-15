function Video({ src, poster }) {
  return (
    <>
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        className="sm:h-[68vh] sm:max-w-4xl h-64 w-full object-cover"
      ></video>
    </>
  );
}

export default Video;