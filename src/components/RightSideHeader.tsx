import Clock from "./Clock.tsx";
import Weather from "./Weather.tsx";

const RightSideHeader = () => {
  return (
    <div className="flex flex-col gap-1 lg:items-end items-start w-full">
      <Clock />
      <Weather />
    </div>
  );
};

export default RightSideHeader;