import { useState, useEffect } from "react";
import Loading from "./Loading";

const Lists = ({ lists }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {/* Pendant le chargement de la data */}
      {/* {loading && <Loading />} */}

      {/* A la réception de la data */}
      {lists.length > 0 && (
        <div>
          <ul>
            {lists.map((x) => (
              <li className="text-red-500 z-10">{x.listTitle}</li>
            ))}
          </ul>
        </div>
      )}
      {/* <h1>Lists cards</h1> */}
    </>
  );
};

export default Lists;
