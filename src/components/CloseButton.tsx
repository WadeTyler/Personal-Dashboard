import {RiCloseLine} from "@remixicon/react";

const CloseButton = ({closeFn, cn}: {
  closeFn: () => void;
  cn?: string
}) => {
  return (
    <div
      className={`p-2 text-3xl hover:bg-zinc-300/60 rounded-md cursor-pointer ${cn}`} onClick={closeFn}
    >
      <RiCloseLine/>
    </div>
  );
};

export default CloseButton;