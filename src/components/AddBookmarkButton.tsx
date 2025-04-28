
const AddBookmarkButton = ({openAddBookmarkPanel}: {
  openAddBookmarkPanel: () => void;
}) => {

  return (
    <button
      onClick={openAddBookmarkPanel}
      className="bg-zinc-300/40 hover:bg-zinc-300/70 flex items-center justify-center lg:w-16 w-12 lg:h-16 h-12 rounded-md duration-300 cursor-pointer"
    >
      <span className="text-3xl">+</span>
    </button>
  );
};

export default AddBookmarkButton;