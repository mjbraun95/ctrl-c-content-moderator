// this will return the reasons that the comments were flagged
// there are two options: Moderation or Misinformation
//
// this component will return the string "misinformation" or
// it will list the top three reasons it was flagged, if a weight
// is above a certain threshold only one reason will be returned
// rather than 3 of the top ones

// along with the reasons the weights will also be supplied in
// percentage format that will be in portions of a whole 100%

import React from "react";

function DisplayCategories({ row }) {
  const formatPercentage = (number) => {
    return number.toFixed(2) + "%";
  };

  const renderFlagReasons = (row) => {
    // Assuming the row object contains a field to indicate misinformation
    if (row.misinformation) {
      return <span>Misinformation</span>;
    } else {
      const sortedReasons = Object.entries(row.top_three_dict || {}).sort(
        (a, b) => b[1] - a[1]
      ); // Sort by weight in descending order
      // .slice(0, 3); // Take top 3 reasons
      if (sortedReasons.length > 0 && sortedReasons[0][1] > 95) {
        // Threshold check
        return (
          <span>
            {sortedReasons[0][0].replace(/_/g, " ")}:{" "}
            {formatPercentage(sortedReasons[0][1])}
          </span>
        );
      }

      return sortedReasons.map(([reason, weight]) => (
        <span key={reason} className="reason-tag d-block">
          {reason.replace(/_/g, " ")}: {formatPercentage(weight)}
        </span>
      ));
    }
  };

  return <span>{renderFlagReasons(row)}</span>;
}

export default DisplayCategories;
