import {FormEvent, useState} from "react";
import {RiCloseLine, RiSearchLine} from "@remixicon/react";
import {motion} from "framer-motion";

const SearchBar = () => {

  const [recentQueries, setRecentQueries] = useState<string[]>(() => {
    const storedQueries = localStorage.getItem('recentQueries');
    return storedQueries ? JSON.parse(storedQueries) : [];
  });
  const [isShowingRecentQueries, setIsShowingRecentQueries] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  function handleSearch(query: string) {
    if (!query) return;

    const updatedQueries: string[] = recentQueries;

    if (updatedQueries.includes(query)) {
      // If already in recent query remove
      updatedQueries.splice(updatedQueries.indexOf(query), 1);
    } else if (recentQueries.length >= 5) {
      // Remove the oldest query if not already in list
      updatedQueries.shift();
    }

    // Add new query
    updatedQueries.push(query);

    // Update state
    setRecentQueries(updatedQueries);

    // Update localStorage
    localStorage.setItem('recentQueries', JSON.stringify(updatedQueries));

    // Navigate to query using selected search engine
    location.href = `https://google.com/search?q=${query}`;
  }

  function handleSubmitForm(event: FormEvent) {
    event?.preventDefault();
    handleSearch(query);
  }

  function removeRecentQuery(index: number) {
    const updatedQueries: string[] = recentQueries;
    updatedQueries.splice(index, 1);
    setRecentQueries(updatedQueries);
    localStorage.setItem('recentQueries', JSON.stringify(updatedQueries));
  }

  return (
    <form
      onSubmit={handleSubmitForm}
      className={`max-w-[85%] lg:max-w-[40rem] w-full bg-zinc-800 rounded-md flex items-center justify-center relative duration-200 ${isShowingRecentQueries && recentQueries.length > 0 && 'rounded-t-none'}`}>
      {/* Input Bar */}
      <div className="relative w-full">
        <input
          onFocus={() => setIsShowingRecentQueries(true)}
          onBlur={(e) => {
            setTimeout(() => {
              if (!e.relatedTarget || !e.relatedTarget.closest('.recent-queries-dropdown')) {
                setIsShowingRecentQueries(false);
              }
            }, 100);
          }}
          type="text"
          className="w-full border-none outline-none focus:outline-none p-2 lg:p-3"
          placeholder="Search the web"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      {/* Recent Queries */}
      {recentQueries && isShowingRecentQueries && (
        <motion.div
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.2}}
          className="w-full absolute bottom-full left-0 bg-zinc-600 flex flex-col rounded-t-md overflow-hidden"
        >
          {recentQueries.map((recentQuery, index) => (
            <div
              key={index}
              className="recent-queries-dropdown w-full bg-zinc-700 hover:bg-zinc-600 z-10 cursor-pointer p-2 lg:p-4 hover:text-primary text-start flex items-center justify-between"
              onClick={(event) => {
                event.preventDefault();
                setQuery(recentQuery);
                handleSearch(recentQuery);
              }}
            >
              <span>{recentQuery}</span>
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  removeRecentQuery(index);
                }}
                className="bg-zinc-400 hover:bg-zinc-900 p-1 rounded-md cursor-pointer text-white hover:text-red-500"
              >
                <RiCloseLine/>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Submit Button */}
      <button className="hover:bg-zinc-600 p-2 lg:p-3 cursor-pointer hover:text-primary duration-200 rounded-r-md">
        <RiSearchLine/>
      </button>

    </form>
  );
};

export default SearchBar;