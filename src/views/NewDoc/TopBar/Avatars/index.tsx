import React from "react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import "./Avatars.css";
import { getRandomGradient } from "./utils";

const gradient = getRandomGradient();

export interface AvatarsProps {
  is_shared: boolean;
}

export const Avatars: React.FC<AvatarsProps> = ({ is_shared }) => {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className="flex items-center space-x-2 mr-4">
      {is_shared &&
        users.map(({ connectionId, info }, index) => {
          return (
            <Avatar key={connectionId} name={info!.name!} index={index + 1} />
          );
        })}

      {currentUser && <Avatar name={currentUser.info!.name!} index={0} />}
    </div>
  );
};

export function Avatar({ name, index }: { name: string; index: number }) {
  return (
    <div
      className="flex-shrink-0 rounded-full border-[3px] border-white h-7 w-7 absolute"
      style={{
        background: gradient,
        right: `${index * 19 + 70}px`,
        zIndex: index,
      }}
      data-tooltip={name}
    >
      <img className="w-full h-full rounded-full" data-tooltip={name} />
    </div>
  );
}
