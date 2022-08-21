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
    console.log("drop");
    setState(false);
    return false; 
  };