import React, { useState } from "react";

const INITIAL_INPUT_STATE = "Xxxx";

export default () => {
  const [inputData, setInputData] = useState(INITIAL_INPUT_STATE);

  return (
    <div>
      <input
        type="text"
        name="name"
        id="name_input"
        className={inputData === INITIAL_INPUT_STATE ? "red" : ""}
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
    </div>
  );
};
