import React from "react";

function NumberToDate({ number }) {
  const timestamp = parseInt(number, 10); // Parse the string to an integer
  const date = new Date(timestamp);

  const formattedDate = `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;

  return <div>{formattedDate}</div>;
}

export default NumberToDate;
