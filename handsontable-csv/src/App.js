//App.js
import React, { useState } from "react";

//import * as lib from "./components/library";
import FileUpload from "./components/FileUpload";
import MyTable from "./components/MyTable";

import ReduxTest from "./components/ReduxTest";
import AnotherReduxTest from "./components/AnotherReduxTest";

const csvObjectDefault = {
  HEIGHT: 0,
  WIDTH: 0,
  csv: [],
};

const App = () => {
  const [csvObject, setCsvObject] = useState(csvObjectDefault);
  return (
    <div>
      <ReduxTest/>
      <AnotherReduxTest/>
      {/* <button onClick={() => console.log(csvObject)}>print csv</button>
      <div className="App">
        <MyTable csvFile={csvObject}/>
        <FileUpload setCsvObject={setCsvObject} />
      </div> */}
    </div>
  );
};

export default App;