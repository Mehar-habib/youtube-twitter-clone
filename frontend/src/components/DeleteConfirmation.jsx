function DeleteConfirmation({ onCancel, onDelete }) {
  return (
    <>
      <div className="text-center space-y-2 sm:p-5 p-3 bg-black border-slate-700 border rounded-xl">
        <h1>Delete this comment Permanently?</h1>
        <div className="font-normal flex gap-2 justify-center">
          <button
            className="bg-[#222222] py-1 px-3 rounded-lg text-sm hover:bg-black cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 py-1 px-3 rounded-lg text-sm hover:opacity-70 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteConfirmation;
