//nodelibrary.js

const MY_SERVER = `http://192.168.55.120:3002`;
export const PATH = `C:\\Users\\username\\Downloads\\TESTFILES`;

export const getFileFolderList = (path, fileExtension) => {
    fetch(`${MY_SERVER}/getFileFolderList?path=${path}&fileExtension=${fileExtension}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

export const getFolderList = (setState, path) => {
    fetch(`${MY_SERVER}/getFileFolderList?path=${path}`)
    .then((response) => response.json())
    .then((data) => setState(data.folderList.map(list => list.name)));
}

export const getFileList = (path, fileExtension, setState) => {
    fetch(`${MY_SERVER}/getFileFolderList?path=${path}&fileExtension=${fileExtension}`)
    .then((response) => response.json())
    .then((data) => setState(data.fileList.map(list => list.name)));
}