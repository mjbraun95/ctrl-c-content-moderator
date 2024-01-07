import React from "react";
import { useState, useEffect } from "react";
import { fetchDataFromFirestore } from "../pages/api/firebase.messages.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faXmarkCircle,
  faPersonWalkingArrowRight,
  faStopwatch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import FormatTimestamp from "./FormatTimestamp";
import DisplayCategories from "./DisplayCategories";
import SetBanStatus from "./SetBanStatus.js";
import SetKickStatus from "./SetKickStatus.js";

export default function Table() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataFromFirestore()
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table custom-border border border-2 border-black">
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Flagged Text</th>
            <th scope="col">Time</th>
            <th scope="col">Reason</th>
            <th scope="col">Ban</th>
            <th scope="col">Kick</th>
            <th scope="col">Timeout</th>
            <th scope="col">Del</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td className="py-4">{row.username}</td>
              <td className="py-4">{row.message}</td>
              <FormatTimestamp timestamp={row.timestamp} />
              <td className="py-4">
                {" "}
                <DisplayCategories row={row} />
              </td>

              {/* Take in the username as a prop */}
              <td className="py-4">
                {/* <FontAwesomeIcon
                  data-bs-toggle="modal"
                  data-bs-target="#banConfirmationModal"
                  icon={faXmarkCircle}
                /> */}
              </td>
              <td className="py-4">
                <FontAwesomeIcon onClick={()=>{
                  console.log(row)
                }} icon={faPersonWalkingArrowRight} />
              </td>
              <td className="py-4">
                <FontAwesomeIcon icon={faStopwatch} />
              </td>
              <td className="py-4">
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          ))}

          {/* Repeat the row for as many entries as you have */}
        </tbody>
      </table>
    </div>
  );
}
