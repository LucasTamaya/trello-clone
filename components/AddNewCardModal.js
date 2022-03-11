import template from "../utils/template";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import InboxIcon from "@mui/icons-material/Inbox";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import mongoObjectId from "../utils/mongodbIdGenerator";
import update from "react-addons-update";

// Composant afin d'ajouter une nouvelle carte à la liste du board

const AddNewCardModal = ({
  setShowAddNewCardModal,
  id,
  index,
  data,
  setData,
}) => {
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");

  const router = useRouter();

  const handleNewCard = async (e) => {
    e.preventDefault();

    // si input non rempli
    if (cardTitle === "" && cardDescription === "") {
      return;
    }

    if (cardTitle !== "" && cardDescription !== "") {
      // création d'un id valide avec mongoDB
      const mongoDbId = mongoObjectId();

      const newCard = {
        _id: mongoDbId,
        cardTitle: cardTitle,
        cardDescription: cardDescription,
        index: index,
      };

      // ajout du nouvel id à la liste des ids des taches
      const newCardId = Array.from(data.columns)
      newCardId[index].taskIds.push(mongoDbId)
      console.log(newCardId)

      // ajout de la nouvelle carte à la liste correspondante
      setData({
        ...data,
        tasks: [...data.tasks, { _id: mongoDbId, cardTitle, cardDescription }],
        
      });
      //columns: [...data.columns, data.columns[index].taskIds.push(mongoDbId)]

      // fermeture du modale d'ajout de carte
      setShowAddNewCardModal(false);

      const req = await axios.post(
        `${template}api/createcard/${router.query.id}`,
        newCard
      );

      if (req.data.message === "CreateCardError") {
        alert("something went wrong");
        setShowAddNewCardModal(false);
      }

      if (req.data.message === "NoError") {
        return;
      }
    }
  };

  return (
    <div className="absolute left-0 top-0 w-screen h-screen flex justify-center items-center bg-gray-200/70">
      <form
        className="w-80 h-fit bg-white p-4 lg:w-[600px] rounded"
        onSubmit={handleNewCard}
      >
        <div className="flex items-start justify-between">
          <div className="flex gap-x-2">
            <InboxIcon className="text-blue-900" />
            <div className="flex flex-col">
              <h3 className="font-bold text-blue-900 text-lg">Card title</h3>
              <input
                type="text"
                value={cardTitle}
                placeholder="Enter the card title..."
                onChange={(e) => setCardTitle(e.target.value)}
                className="border-b-2 border-blue-900 outline-0 bg-white w-60 p-1 text-blue-900 font-bold placeholder:text-blue-900 font-normal"
              />
            </div>
          </div>
          <CloseIcon
            className="text-blue-900 cursor-pointer"
            onClick={() => setShowAddNewCardModal(false)}
          />
        </div>
        {/* <p>in list {listTitle}</p> */}
        <div className="flex items-start gap-x-2 mt-7">
          <DescriptionIcon className="text-blue-900" />
          <div className="flex flex-col w-full">
            <h3 className="font-bold text-blue-900 text-lg">Description</h3>
            <textarea
              cols="20"
              rows="10"
              placeholder="Add a more detailed description"
              value={cardDescription}
              onChange={(e) => setCardDescription(e.target.value)}
              className="border-2 border-blue-900 rounded p-2 w-full resize-none text-blue-900 placeholder:text-blue-900"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-center p-2 bg-blue-600 text-white rounded mt-7 hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddNewCardModal;

/*

todo: {
        id: "abc123",
        name: "AAA",
        lists: [
          {
            id: "def456", 
            desc: "description",
            listItems: [
              {
                id: "ghj678", 
                title: "title1",
                listItemsId: "88abf1"
              },
              {
                id: "poi098",    <-------------------------------------
                title: "title2",
                listItemsId: "2a49f25"
              }
            ]   
          },
          {
            id: "zxc456", 
            desc: "description3",
            listItems: [
              {
                id: "qyu678", 
                title: "title3",
                listItemsId: "h60bf1"
              },
              {
                id: "p8l098", 
                title: "title4",
                listItemsId: "6yuf25"
              }
            ]   
          }
        ]  
      }
    }
  }
*/
