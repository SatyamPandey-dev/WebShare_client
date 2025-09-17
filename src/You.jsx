import React from "react";

import { supabase } from "./supabaseClient";
export default function You({ user }) {
  async function signOut() {
    await supabase.auth.signOut();
  }

  console.log(user?.user_metadata);
  return (
    <div className="flex flex-col items-center justify-center p-10 gap-5 ">
      <div className="rounded-full border-2 border-black p-2">
        <img
          src={user?.user_metadata?.avatar_url || user?.user_metadata?.picture}
          alt={user?.user_metadata?.full_name || "#"}
          className="w-32 h-32 rounded-full "
        />
      </div>
      <div>
        <h3 className="text-center  ">
          Hi {user?.user_metadata?.full_name || "Unknown User"}
        </h3>
        <h3 className="text-center">{user?.email || "Unknown User"}</h3>
      </div>
      <button
        className="bg-red-400 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-500"
        onClick={signOut}
      >
        SignOut
      </button>
    </div>
  );
}
