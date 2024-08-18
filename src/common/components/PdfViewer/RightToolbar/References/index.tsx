import React from "react";
import { PaperInformationType } from "../../interface";

export interface ReferencesProps {
  paperInformation: PaperInformationType;
}

export const References = ({ paperInformation }) => {
  return (
    <div className="py-5 px-2.5">
      {paperInformation.references.length > 0 &&
        paperInformation.references.map((reference) => (
          <div className="leading-10 h-10 text-neutral-900 hover:bg-neutral-100 cursor-pointer rounded-sm px-2 whitespace-nowrap overflow-hidden text-ellipsis"></div>
        ))}
    </div>
  );
};
