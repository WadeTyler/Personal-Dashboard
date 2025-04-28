import AddBookmarkButton from "./components/AddBookmarkButton.tsx";
import {useEffect, useState} from "react";
import AddBookmarkPanel from "./components/AddBookmarkPanel.tsx";
import {Bookmark} from "./types/bookmark.types.ts";
import BookmarkButton from "./components/BookmarkButton.tsx";
import RightSideHeader from "./components/RightSideHeader.tsx";
import {RiSettings3Line} from "@remixicon/react";
import SettingsPanel from "./components/SettingsPanel.tsx";
import {Settings} from "./types/settings.types.ts";
import SearchBar from "./components/SearchBar.tsx";

function App() {

  // States
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isAddingBookmark, setIsAddingBookmark] = useState<boolean>(false);

  const defaultSettings: Settings = {
    backgroundImage: "",
    bgImageBrightness: 75
  };

  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Functions
  function loadBookmarks() {
    // Get current bookmarks from local storage
    const bookmarksStr = localStorage.getItem('bookmarks');
    setBookmarks(bookmarksStr ? JSON.parse(bookmarksStr) : []);
  }

  function loadSettings() {
    // Get current settings from localstorage
    const localSettingsStr = localStorage.getItem('settings');

    if (!localSettingsStr) {
      // Load default settings
      setSettings(defaultSettings);
      localStorage.setItem('settings', JSON.stringify(defaultSettings));
    } else {
      setSettings(JSON.parse(localSettingsStr));
    }
  }

  // OnRender useEffect
  useEffect(() => {
    loadBookmarks();
    loadSettings();
  }, []);

  // Debug UseEffect
  // TODO: Remove
  useEffect(() => {
    console.log("Bookmarks: ", bookmarks);
    console.log("Settings: ", settings);
  }, [bookmarks, settings]);

  return (
    <div className="w-full h-screen flex flex-col gap-4 lg:p-8 p-4 text-white">

      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-zinc-800"
           style={{
             backgroundImage: settings.backgroundImage ? `url(${settings.backgroundImage})` : 'url("./bg-image.jpg")',
             backgroundPosition: 'center',
             backgroundSize: 'cover',
             filter: `brightness(${settings.bgImageBrightness}%)`
           }}
      />

      {/* Header */}
      <header className="flex justify-between lg:gap-4 gap-1 items-start lg:flex-row flex-col w-full">
        <h1 className="text-3xl lg:text-5xl font-semibold tracking-wide">
          Dashboard
        </h1>

        <RightSideHeader/>
      </header>

      {/* Bookmarks */}
      <div className="w-full flex flex-wrap gap-4">
        {bookmarks.map((bookmark, index) => (
          <BookmarkButton key={index} bookmark={bookmark} loadBookmarks={loadBookmarks}/>
        ))}

        <AddBookmarkButton openAddBookmarkPanel={() => setIsAddingBookmark(true)}/>
      </div>


      {/* Add Bookmarks Panel */}
      {isAddingBookmark && (
        <AddBookmarkPanel closeAddBookmarkPanel={() => setIsAddingBookmark(false)} loadBookmarks={loadBookmarks}/>
      )}



      {isSettingsOpen && (
        <SettingsPanel closeSettings={() => setIsSettingsOpen(false)} settings={settings} setSettings={setSettings}
                       loadSettings={loadSettings}/>
      )}


      <div className="w-full flex items-center justify-center gap-4 justify-self-end mt-auto">

        <SearchBar />

        {/* Open Settings Button */}
        <button
          className="flex items-center justify-center p-2 z-50 bg-zinc-400 rounded-md shadow-md hover:bg-zinc-600 duration-200 cursor-pointer"
          onClick={() => setIsSettingsOpen(true)}>
          <RiSettings3Line/>
        </button>
      </div>


    </div>
  )
}

export default App
