//nodelibrary.js

export const MY_SERVER = `http://192.168.55.120:3002`;
export const PATH = `C:\\Users\\username\\Downloads\\TESTFILES`;

export const getFileFolderList = (path, fileExtension) => {
  fetch(
    `${MY_SERVER}/getFileFolderList?path=${path}&fileExtension=${fileExtension}`
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export const getFolderList = (setState, path) => {
  fetch(`${MY_SERVER}/getFileFolderList?path=${path}`)
    .then((response) => response.json())
    .then((data) => setState(data.folderList.map((list) => list.name)));
};

export const getFileList = (path, fileExtension, setState) => {
  fetch(
    `${MY_SERVER}/getFileFolderList?path=${path}&fileExtension=${fileExtension}`
  )
    .then((response) => response.json())
    .then((data) => setState(data.fileList.map((list) => list.name)));
};

export const getFile = (path) => {
  /* this is for just test */
  fetch(`${MY_SERVER}/getFile?path=${path}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export function deleteFiles(fileName, callback) {
  if (fileName === undefined) return;

  fetch(`${MY_SERVER}/fileDelete?fileName=${fileName}`)
    .then((res) => res.json())
    .then((data) => {
      data.result === "success"
        ? alert("파일 삭제 성공")
        : alert("파일 삭제 실패 : 파일이 없습니다. ");
      if (callback) callback();
    })
    .catch((error) => console.log(error));
}
