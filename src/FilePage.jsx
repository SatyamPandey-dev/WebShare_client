import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FilePage({ user }) {
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (!user) {
      // if not logged in, store redirect path
      localStorage.setItem("redirectTo", `/file/${id}`);
      return;
    }

    async function fetchFile() {
      const res = await fetch(`http://localhost:5000/file/${id}?expiry=3600`);
      const data = await res.json();
      setFileUrl(data.url);
    }
    fetchFile();
  }, [id, user]);

  if (!user) return <p>Please sign in to view this file...</p>;
  if (!fileUrl) return <p>Loading file...</p>;

  if (fileUrl.match(/\.(jpg|jpeg|png|gif)$/)) {
    return <img src={fileUrl} alt="shared file" className="max-w-lg mx-auto" />;
  }
  if (fileUrl.match(/\.(mp3|wav)$/)) {
    return <audio controls src={fileUrl} />;
  }
  if (fileUrl.match(/\.(mp4|webm)$/)) {
    return (
      <video controls className="max-w-lg mx-auto">
        <source src={fileUrl} />
      </video>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <p>Hii Dear ! Here is Your File click download File to continue</p>
      <a
        href={fileUrl}
        download
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Download File
      </a>
      <p>
        Want to Share Files TO someone{" "}
        <Link to={`/`} className=" text-blue-600 underline">
          Click Here
        </Link>{" "}
      </p>
    </div>
  );
}
