import React, { useState, useRef } from "react";
import PaperlessButton from "./PaperlessButton";
import HistoryButton from "./HistoryButton";
import ShareButton from "./ShareButton";
import DownloadButton from "./DownloadButton";
import DeleteButton from "./DeleteButton";

const DropdownMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef<number | null>(null);

  const handleButtonClick = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
    } else {
      setDropdownOpen(true);
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      setDropdownOpen(false);
    }, 300); // 延迟关闭时间
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  };

  return (
    // TODO: 图标样式还需要调整
    <div className="relative">
      <button className="text-gray-600" onClick={handleButtonClick}>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 10a2 2 0 114 0 2 2 0 01-4 0zM2 10a6 6 0 1112 0A6 6 0 012 10zM10 2a6 6 0 100 12A6 6 0 0010 2z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      {dropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        >
          <PaperlessButton />
          <HistoryButton />
          <ShareButton />
          <DownloadButton />
          <DeleteButton />
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

// import React, { useState } from "react";
// import PaperlessButton from "./PaperlessButton";
// import HistoryButton from "./HistoryButton";
// import ShareButton from "./ShareButton";
// import DownloadButton from "./DownloadButton";
// import DeleteButton from "./DeleteButton";

// const DropdownMenu = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleButtonClick = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleMouseLeave = () => {
//     setDropdownOpen(false);
//   };

//   const handleMouseEnter = () => {
//     // 这里不需要做任何操作，只是为了保持接口一致性
//   };

//   return (
//     <div
//       className="relative"
//       onMouseLeave={handleMouseLeave}
//       onMouseEnter={handleMouseEnter}
//     >
//       <button className="text-gray-600" onClick={handleButtonClick}>
//         <svg
//           className="w-6 h-6"
//           fill="currentColor"
//           viewBox="0 0 20 20"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fillRule="evenodd"
//             d="M6 10a2 2 0 114 0 2 2 0 01-4 0zM2 10a6 6 0 1112 0A6 6 0 012 10zM10 2a6 6 0 100 12A6 6 0 0010 2z"
//             clipRule="evenodd"
//           ></path>
//         </svg>
//       </button>
//       {dropdownOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
//           <PaperlessButton />
//           <HistoryButton />
//           <ShareButton />
//           <DownloadButton />
//           <DeleteButton />
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownMenu;
