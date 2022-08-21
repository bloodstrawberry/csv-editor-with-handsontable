// library.js
export const handleOnDragLeave = (e, setState) => {
    e.preventDefault();
    setState(false);
    return false;
  };
  
  export const handleDragOver = (e, setState) => {
    e.preventDefault();
    setState(true);
    return false;
  };
  
  export const handleOnDrop = (e, setState) => {
    e.preventDefault();
  
    let file = e.dataTransfer.files[0];
    let fileReader = new FileReader();
  
    fileReader.readAsText(file, "utf-8"); // or euc-kr
  
    fileReader.onload = function () {
      console.log(fileReader.result); 
      return;
    };
  
    setState(false);
    return false; 
  };
  
  export const handleUpload = (e) => {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    
    if(file === undefined) return; /* 방어 코드 추가 */
      
    fileReader.readAsText(file, "utf-8"); // or euc-kr
  
    fileReader.onload = function () {
      console.log(fileReader.result); 
    };
  }