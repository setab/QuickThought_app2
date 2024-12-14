import { useState } from "react";
import axios from "axios";

interface UploadImgButtonProps {
  uploadType: "dp" | "pp"; // dp: Display Picture, pp: Profile Picture/Banner
}

const UploadImgButton: React.FC<UploadImgButtonProps> = ({ uploadType }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiEndpoint =
    uploadType === "dp"
      ? "http://127.0.0.1:5000/api/uploadImage/uploaddp"
      : "http://127.0.0.1:5000/api/uploadImage/uploadpp";

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setIsUploading(true);
    setError(null);

    try {
      const response = await axios.post(apiEndpoint, formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        alert("Image uploaded successfully!");
      } else {
        setError(
          response.data.message ||
            "Failed to upload the image. Please try again."
        );
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setError("An error occurred while uploading the image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        id={`upload-${uploadType}`}
        onChange={handleImageUpload}
        className="hidden"
      />
      <label
        htmlFor={`upload-${uploadType}`}
        className="btn btn-sm btn-outline rounded-full cursor-pointer"
      >
        {isUploading ? "Uploading..." : "Upload"}
      </label>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default UploadImgButton;
