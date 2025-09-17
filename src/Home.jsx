import { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Home({ user }) {
  const [file, setFile] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");
  const [expiry, setExpiry] = useState(3600);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("expiry", expiry);
    formData.append("user_id", user.id);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      setDownloadLink(res.data.shareUrl);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <div className=" flex flex-col justify-around items-center gap-4 ">
        <motion.p
          className="sm:text-5xl text-[35px] font-bold mt-4 flex flex-wrap text-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          👋 Welcome,{" "}
          <span className="sm:text-5xl text-[35px] text-center font-bold bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">
            {user?.user_metadata?.full_name}
          </span>
        </motion.p>

        <motion.div
          className="box bg-gradient-to-r from-white to-yellow-500 shadow-md border-black border-2 min-h-[400px] flex w-[70vw] rounded-2xl p-5 flex-col items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div>
            <h1 className="text-2xl text-center font-bold mt-4">
              📤 File Sharing with Expiry
            </h1>
            <p className="text-center">
              Share secure high size Files to Anyone With an expiry time
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-1">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="border p-2 mt-2 rounded w-[150px]"
            />
            <select
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="border p-2 rounded mt-2"
            >
              <option value={3600}>Expire in 1 Hour</option>
              <option value={86400}>Expire in 1 Day</option>
              <option value={604800}>Expire in 7 Days</option>
            </select>
          </div>

          {/* Upload button OR Progress bar */}
          {!uploading ? (
            <button
              onClick={handleUpload}
              className="bg-green-600 text-white px-4 py-2 rounded mt-2"
            >
              Upload
            </button>
          ) : (
            <div className="w-full mt-3 flex flex-col items-center">
              <p className="text-center">{progress}% uploaded</p>
              <div className="w-full bg-gray-200 rounded h-3 overflow-hidden">
                <motion.div
                  className="bg-blue-600 h-3 rounded"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Download link after upload */}
          {downloadLink && (
            <div className="mt-4 flex flex-col items-center gap-2 ">
              <p>✅ File uploaded! Share this link:</p>
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={downloadLink}
                  readOnly
                  className="border px-2 py-1 rounded sm:w-80 w-40 "
                  onFocus={() => setCopied(true)}
                  onBlur={() => setCopied(false)}
                />
                <button
                  onClick={() => {
                    if (document.activeElement === inputRef.current) {
                      setCopied(true);
                    } else {
                      navigator.clipboard.writeText(downloadLink);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }
                  }}
                  className="bg-gray-800 text-white px-3 py-1 rounded focus:bg-gray-700"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
