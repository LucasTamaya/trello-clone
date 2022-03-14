import AddIcon from "@mui/icons-material/Add";
import { DesignServices } from "@mui/icons-material";

const AddNewCard = ({ setShowAddNewCardModal }) => {
  return (
    <div className="mt-3 flex justify-between items-center gap-x-2">
      <button
        className="flex items-center gap-x-1 w-full rounded p-2 hover:bg-[rgb(235,236,240)]"
        onClick={() => setShowAddNewCardModal(true)}
      >
        <AddIcon />
        Add a card
      </button>
      <div className="flex items-center justify-center p-2 rounded hover:bg-[rgb(235,236,240)]">
        <DesignServices className="text-lg" />
      </div>
    </div>
  );
};

export default AddNewCard;
