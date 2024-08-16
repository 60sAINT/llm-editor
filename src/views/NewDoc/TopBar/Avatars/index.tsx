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
        users.map(({ connectionId, info }) => {
          return <Avatar key={connectionId} name={info!.name!} />;
        })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar name={currentUser.info!.name!} />
        </div>
      )}
    </div>
  );
};

export function Avatar({ name }: { name: string }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-full border-[3px] border-white h-7 w-7 -ml-4"
      style={{ background: gradient }}
      data-tooltip={name}
    >
      <img className="w-full h-full rounded-full" data-tooltip={name} />
    </div>
  );
}
