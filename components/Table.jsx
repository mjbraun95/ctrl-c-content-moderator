import React from "react";
import { useState, useEffect } from "react";
import { fetchDataFromFirestore } from "../pages/api/firebase.call.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faXmarkCircle,
  faPersonWalkingArrowRight,
  faStopwatch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import FormatTimestamp from "./FormatTimestamp";

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
              <td className="py-4" scope="row">
                {row.user_ID}
              </td>
              <td className="py-4">{row.message}</td>
              <FormatTimestamp timestamp={row.timestamp} />
              <td className="py-4">
                {" "}
                {console.log(row)}
                <span>Hate Speech 98%</span>
                <span> Violence 40%</span>
                <span>Harrasment 20%</span>{" "}
              </td>

              <td className="py-4">
                <FontAwesomeIcon
                  data-bs-toggle="modal"
                  data-bs-target="#banConfirmationModal"
                  icon={faXmarkCircle}
                />
              </td>
              <td className="py-4">
                <FontAwesomeIcon icon={faPersonWalkingArrowRight} />
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
