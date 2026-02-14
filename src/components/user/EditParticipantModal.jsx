import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apis from "../../config/api";

const EditParticipantModal = ({ isOpen, onClose, participant, refetch }) => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    whatsapp: "",
  });
  console.log(participant, "part da");
  useEffect(() => {
    if (participant) {
      setFormData({
        name: participant.name || "",
        fatherName: participant.fatherName || "",
        whatsapp: participant.whatsapp || "",
      });
    }
  }, [participant]);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => apis.updateInfo(participant.id, data),
    onSuccess: () => {
      toast.success("Participant updated successfully");
      refetch();
      onClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Update failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Edit Participant Data</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            type="text"
            placeholder="Father Name"
            className="w-full border px-3 py-2 rounded"
            value={formData.fatherName}
            onChange={(e) =>
              setFormData({
                ...formData,
                fatherName: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="WhatsApp"
            className="w-full border px-3 py-2 rounded"
            value={formData.whatsapp}
            onChange={(e) =>
              setFormData({
                ...formData,
                whatsapp: e.target.value,
              })
            }
          />

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-400 text-white rounded cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-3 py-1 bg-primary text-white rounded cursor-pointer"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditParticipantModal;
