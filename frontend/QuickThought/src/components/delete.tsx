import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";

interface DeleteButtonProps {
  thoughtId: number;
  onDelete: (thoughtId: number) => void; // Callback to update parent state after deletion
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ thoughtId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5000/api/thought/${thoughtId}`,
        { withCredentials: true }
      );

      if (response.data.success) {
        // Notify parent to update UI
        onDelete(thoughtId);
      } else {
        alert("Failed to delete the thought.");
      }
    } catch (error) {
      console.error("Error deleting thought:", error);
      alert("An error occurred while deleting the thought.");
    }
  };

  return (
    <button
      className="flex items-center gap-2 text-red-500 cursor-pointer"
      onClick={handleDelete}
    >
      <AiOutlineDelete />
      <span>Delete</span>
    </button>
  );
};

export default DeleteButton;
