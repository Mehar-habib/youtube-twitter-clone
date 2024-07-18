import { FaPlayCircle } from "./icons";

function NoVideosFound({ text }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen pb-20">
      <FaPlayCircle size={45} className="text-purple-500" />
      <p className="mt-4 text-lg"> There are no videos here available</p>
      <p>{text && text}</p>
    </div>
  );
}

export default NoVideosFound;
