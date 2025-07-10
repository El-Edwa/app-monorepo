import { Helmet } from "react-helmet-async";
import { useState, useRef, useEffect } from "react";
import HomeNav from "@/components/home/HomeNav";
import HomeCreateTweet from "@/components/home/HomeCreateTweet";

interface GifObject {
  url: string;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"forYou" | "following">("forYou");
  const [tweetContent, setTweetContent] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [selectedGifs, setSelectedGifs] = useState<string[]>([]);
  const [showGifPicker, setShowGifPicker] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [tweetContent]);

  const imagePickHandler = () => {
    // Trigger the hidden file input click for images
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const gifPickHandler = () => {
    // Toggle the GIF picker visibility
    setShowGifPicker(!showGifPicker);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles: File[] = [];
      const newPreviews: string[] = [];

      // Process each selected file
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          newFiles.push(file);
          const previewUrl = URL.createObjectURL(file);
          newPreviews.push(previewUrl);
        }
      });

      console.log("Selected files:", newFiles);

      if (newFiles.length > 0) {
        // Add new files to existing ones
        setSelectedFiles([...selectedFiles, ...newFiles]);
        setFilePreviews([...filePreviews, ...newPreviews]);
      } else {
        alert("Please select image files only");
      }
    }
  };

  const handleGifSelect = (gifObject: GifObject) => {
    // Add the selected GIF URL to the collection
    const gifUrl = gifObject.url;
    setSelectedGifs([...selectedGifs, gifUrl]);
    setShowGifPicker(false); // Close the picker after selection
  };

  const removeFile = (index: number) => {
    // Clean up the preview URL if it's a file
    if (index < filePreviews.length) {
      URL.revokeObjectURL(filePreviews[index]);
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
      setFilePreviews((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Remove GIF
      const gifIndex = index - filePreviews.length;
      setSelectedGifs((prev) => prev.filter((_, i) => i !== gifIndex));
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getAllMediaItems = () => {
    const fileItems = filePreviews.map((preview, index) => ({
      type: "file",
      url: preview,
      file: selectedFiles[index],
      index,
    }));

    const gifItems = selectedGifs.map((gifUrl, index) => ({
      type: "gif",
      url: gifUrl,
      index: index + filePreviews.length,
    }));

    return [...fileItems, ...gifItems];
  };

  const allMediaItems = getAllMediaItems();

  return (
    <section className="flex flex-col items-center min-h-screen">
      <Helmet>
        <title>Home / X</title>
        <meta name="description" content="Welcome to the X clone homepage" />
      </Helmet>

      {/* Home Navigation */}
      <HomeNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Create Tweet */}
      <HomeCreateTweet
        textareaRef={textareaRef}
        fileInputRef={fileInputRef}
        allMediaItems={allMediaItems}
        removeFile={removeFile}
        showGifPicker={showGifPicker}
        setShowGifPicker={setShowGifPicker}
        handleGifSelect={handleGifSelect}
        tweetContent={tweetContent}
        setTweetContent={setTweetContent}
        imagePickHandler={imagePickHandler}
        gifPickHandler={gifPickHandler}
        handleFileChange={handleFileChange}
      />

      {/* Content based on active tab */}
      <div className="w-full p-4">
        {activeTab === "forYou" ? (
          <div>
            <h2 className="text-xl font-bold mb-4">For You Timeline</h2>
            {/* For You content */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((item) => (
                <div key={item} className="border-b border-neutral-800 pb-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">User {item}</span>
                        <span className="text-gray-500">@user{item}</span>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500">2h</span>
                      </div>
                      <p className="text-gray-200">
                        This is a sample tweet for the "For You" feed. Lorem
                        ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <h2 className="text-xl font-bold mb-4">Following Timeline</h2>
            {/* Following content */}
            <div className="space-y-4">
              {[4, 5, 6].map((item) => (
                <div key={item} className="border-b border-neutral-800 pb-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">Following {item}</span>
                        <span className="text-gray-500">@following{item}</span>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500">3h</span>
                      </div>
                      <p className="text-gray-200">
                        This is a sample tweet for the "Following" feed. Lorem
                        ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
