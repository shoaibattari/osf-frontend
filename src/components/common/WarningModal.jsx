import { IoAlertCircleOutline } from "react-icons/io5";

const WarningModal = ({
  onConfirm,
  onCancel,
  loading,
  heading = "payroll",
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white py-4 text-center w-full">
        <IoAlertCircleOutline className="text-red-600 text-6xl mx-auto" />

        <p className="text-xl font-medium text-gray-800 pt-2 pb-6">
          Are you sure you want to delete this {heading} ?
        </p>

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="bg-gray-200 text-black py-2 px-12 rounded-lg hover:bg-gray-300 cursor-pointer disabled:opacity-70"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 text-white disabled:bg-red-600/50 py-2 px-12 rounded-lg hover:bg-red-700 cursor-pointer disabled:opacity-70"
          >
            {loading ? "Deleting..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;