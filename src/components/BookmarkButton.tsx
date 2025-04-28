import {Bookmark} from "../types/bookmark.types.ts";
import {RiCloseLine} from "@remixicon/react";

const BookmarkButton = ({bookmark, loadBookmarks}: {
  bookmark: Bookmark;
  loadBookmarks: () => void;
}) => {

  function handleRemoveBookmark() {
    // Retrieve bookmarks from localStorage
    const bookmarksStr = localStorage.getItem('bookmarks');
    if (!bookmarksStr) return;
    const bookmarks: Bookmark[] = JSON.parse(bookmarksStr);

    // Create updated bookmarks without current bookmark
    const updatedBookmarks: Bookmark[] = bookmarks.filter((bm) => bm.name !== bookmark.name);

    // Update localstorage
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));

    // Reload bookmarks
    loadBookmarks();
  }

  return (
    <div className="w-12 lg:w-16 flex flex-col gap-1 group">
      <div
        className="bg-zinc-300/40 hover:bg-zinc-300/70 flex items-center justify-center w-12 lg:w-16 h-12 lg:h-16 rounded-md duration-300 cursor-pointer relative "
      >
        <button
          onClick={handleRemoveBookmark}
          className="absolute top-0 right-0 bg-zinc-500 hover:bg-red-600 duration-200 translate-x-1/2 -translate-y-1/2 rounded-full hidden group-hover:block cursor-pointer"
        >
          <RiCloseLine className="size-5"/>
        </button>
        <a href={bookmark.link} className={"w-full h-full flex items-center justify-center"}/>
      </div>
      <span className="text-xs">
        {bookmark.name.length > 12
          ? bookmark.name.substring(0, 9) + "..."
          : bookmark.name
        }
      </span>
    </div>
  );
};

export default BookmarkButton;