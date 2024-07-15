import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "./helper/timeAgo";
import Likes from "./Likes";
import { useState } from "react";
import { deleteAComment, editAComment } from "../store/slices/commentSlice";
import { HiOutlineDotsVertical } from "./icons";
import EditComment from "./EditComment";
import DeleteConfirmation from "./DeleteConfirmation";

function CommentsList({
  avatar,
  username,
  createdAt,
  content,
  commentId,
  isLiked,
  likeCount,
}) {
  const avatar2 = useSelector((state) => state.auth?.userData?.avatar.url);
  const authUsername = useSelector((state) => state.auth?.userData?.username);
  const dispatch = useDispatch();

  const [editState, setEditState] = useState({
    editing: false,
    editedContent: content,
    isOpen: false,
    deleteConfirm: false,
  });

  const handleEditComment = () => {
    dispatch(
      editAComment({ commentId, editedContent: editState.editedContent })
    );
    setEditState((prevState) => ({
      ...prevState,
      editing: false,
      isOpen: false,
      delete: false,
    }));
  };

  const handleDeleteComment = () => {
    dispatch(deleteAComment({ commentId }));
    setEditState((prevState) => ({ ...prevState, delete: false }));
  };

  return (
    <>
      <div className="text-white w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5">
        <div className="w-12">
          <img
            src={avatar || avatar2}
            className="w-10 h-10 object-cover rounded-full"
          />
        </div>
        <div className="w-full flex flex-col gap-1 relative">
          <div className="flex items-center gap-2">
            <h2 className="text-xs">{username}</h2>
            <span className="text-xs text-slate-400">{timeAgo(createdAt)}</span>
          </div>
          <p className="text-sm">{content}</p>
          {/* dropdown for edit and delete comment */}
          {authUsername === username && (
            <div className="absolute right-0">
              <div className="relative">
                <HiOutlineDotsVertical
                  className="cursor-pointer"
                  onClick={() =>
                    setEditState((prevState) => ({
                      ...prevState,
                      isOpen: !prevState.isOpen,
                    }))
                  }
                />

                {editState.isOpen && (
                  <div className="border bg-[#222222] text-lg border-sky-700 absolute text-center right-2 rounded-xl">
                    <ul>
                      <li
                        className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-600"
                        onClick={() =>
                          setEditState((prevState) => ({
                            ...prevState,
                            editing: !prevState.editing,
                            isOpen: false,
                          }))
                        }
                      >
                        Edit
                      </li>
                      <li
                        className="px-5 hover:opacity-50 cursor-pointer"
                        onClick={() =>
                          setEditState((prevState) => ({
                            ...prevState,
                            delete: true,
                            isOpen: false,
                          }))
                        }
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Delete confirm popup */}
          {editState.delete && (
            <div className="absolute right-[20%] top-[50%] z-50">
              <DeleteConfirmation
                onCancel={() =>
                  setEditState((prevState) => ({
                    ...prevState,
                    delete: false,
                    isOpen: false,
                  }))
                }
              />
              onDelete={handleDeleteComment}
            </div>
          )}

          {/* edit comment */}
          {editState.editing && (
            <EditComment
              initialContent={content}
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  editing: false,
                  isOpen: false,
                }))
              }
              onSave={handleEditComment}
            />
          )}
          <Likes
            isLiked={isLiked}
            likeCount={likeCount}
            commentId={commentId}
            size={17}
          />
        </div>
      </div>
    </>
  );
}

export default CommentsList;
