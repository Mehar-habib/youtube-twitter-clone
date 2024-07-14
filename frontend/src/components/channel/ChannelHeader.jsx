import { NavLink } from "react-router-dom";
import { Button } from "../index.js";

function ChannelHeader({
  coverImage,
  avatar,
  username,
  fullName,
  subscribersCount,
  subscribedCount,
  children,
}) {
  return (
    <>
      <div className="w-full h-full text-white">
        {/* coverImage section */}
        <section className="w-full">
          {coverImage ? (
            <img
              src={coverImage}
              className="sm:h-40 h-28 w-full object-cover"
            />
          ) : (
            <div className="sm:h-40 h-28 w-full border-slate-600 border-b bg-black"></div>
          )}
        </section>
        {/*channel details section  */}
        <section className=" w-full sm:px-5 p-2 flex sm:flex-row flex-col items-start sm:gap-4">
          <div className="relative h-12">
            <div className="relative sm:w-32 w-28 sm:h-32 h-28">
              <img
                src={avatar}
                className="rounded-full sm:w-32 w-28 sm:h-32 h-28 object-cover absolute sm:bottom-10 bottom-20 outline-none"
              />
            </div>
          </div>
          <div className="w-full md:h-24 sm:h-20 flex justify-between items-start px-1">
            <div>
              <h1 className="text-xl font-bold">{username}</h1>
              <h3 className="text-sm text-slate-400">@{fullName}</h3>
              <div className="flex gap-1">
                <p className="text-xs text-slate-400">
                  {subscribersCount} subscribers
                </p>
                <p className="text-xs text-slate-400">
                  {subscribedCount} subscribed
                </p>
              </div>
            </div>
            <div>
              <Button className="border-slate-500 hover:scale-110 transition-all text-black font-bold px-4 py-1 bg-purple-500">
                Edit
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ChannelHeader;
