// library.js
export const handleOnDragLeave = (e, setState) => {
    e.preventDefault();
    console.log("leave");
    setState(false);
    return false;
  };
  
  export const handleDragOver = (e, setState) => {
    e.preventDefault();
    console.log("over");
    setState(true);
    return false;
  };
  
  export const handleOnDrop = (e, setState) => {
    e.preventDefault();
  
    console.log(e);
    let file = e.dataTransfer.files[0];
    console.log(file);
    let fileReader = new FileReader();
    fileReader.readAsText(file, "utf-8"); // or euc-kr
    console.log(fileReader);
    console.log(fileReader.result); // null
    
    fileReader.onload = function () {
      console.log(fileReader.result); 
      return;
    };
  
    setState(false);
    return false; 
  };