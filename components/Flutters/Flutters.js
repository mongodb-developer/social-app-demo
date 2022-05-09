import React from "react";
import Flutter from "./Flutter";

const Flutters = ({ flutters, setFlutters }) => {
  return (
    <>
      {flutters.map((flutter) => (
        <div key={flutter._id}>
          <Flutter flutter={flutter} setFlutters={setFlutters} />
        </div>
      ))}
    </>
  );
};

export default Flutters;
