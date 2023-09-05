import React from "react";

export default function ErrorPlaceholder({ error }: { error: string }) {
  return (
    <div className="block m-auto w-full text-black bg-red-300 rounded-md p-8 text-2xl">
      {error}
    </div>
  );
}
