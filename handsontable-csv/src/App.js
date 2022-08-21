// App.js
import React, { useState } from "react";
//import * as lib from "./components/library";
import FileUpload from "./components/FileUpload";

const csvObjectDefault = {
  HEIGHT: 0,
  WIDTH: 0,
  csv: [],
};

const App = () => {
  const [csvObject, setCsvObject] = useState(csvObjectDefault);

  return (
    <div>
      <button onClick={() => console.log(csvObject)}>print csv</button>
      <div className="App">
        <FileUpload setCsvObject={setCsvObject} />
      </div>
    </div>
  );
};

export default App;