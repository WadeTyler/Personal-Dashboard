import CloseButton from "./CloseButton.tsx";
import {FormEvent, useState} from "react";
import {Bookmark} from "../types/bookmark.types.ts";

const AddBookmarkPanel = ({closeAddBookmarkPanel, loadBookmarks}: {
  closeAddBookmarkPanel: () => void;
  loadBookmarks: () => void;
}) => {

  const [name, setName] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  function handleAddBookmark(event: FormEvent) {
    event.preventDefault();

    // Validate input
    if (!name || !link) {
      setErrorMsg("Name and Link required.");
      return;
    }

    // Get current bookmarks from local storage
    const bookmarksStr = localStorage.getItem('bookmarks');
    const bookmarks: Bookmark[] = bookmarksStr ? JSON.parse(bookmarksStr) : [];

    // Check if name already exists
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].name === name) {
        setErrorMsg("Bookmark name already taken.");
        return;
      }
    }

    // Create and add new bookmarks
    const newBookmark: Bookmark = {name, link};
    bookmarks.push(newBookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));


    // Reload bookmarks
    loadBookmarks();
    closeAddBookmarkPanel();
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/60 flex items-center justify-center">
      <form
        onSubmit={handleAddBookmark}
        className="w-96 flex flex-col items-center justify-center rounded-md shadow-md bg-zinc-800 text-white gap-4 overflow-hidden"
      >

        <section className="flex justify-between items-center w-full px-4 pt-4 gap-2">
          <legend className="text-3xl font-semibold">Add Bookmark</legend>
          <CloseButton closeFn={closeAddBookmarkPanel}/>
        </section>

        <fieldset className="w-full flex flex-col gap-4 px-4">
          <input type="text" placeholder="Bookmark Name" className="input-bar" required minLength={3} maxLength={50}
                 onChange={(event) => setName(event.target.value)}/>
          <input type="text" placeholder="Bookmark Link" className="input-bar" required minLength={3} maxLength={500}
                 onChange={(event) => setLink(event.target.value)}/>

          <span className="text-center italic text-red-600">{errorMsg}</span>
        </fieldset>

        <fieldset className="w-full flex gap-4 p-4 bg-zinc-900">
          <button className="submit-btn w-full">Create Bookmark</button>
        </fieldset>
      </form>

    </div>
  );
};

export default AddBookmarkPanel;