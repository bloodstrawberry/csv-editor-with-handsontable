//nodelibrary.js

const MY_SERVER = `http://192.168.55.120:3002`;
export const PATH = `C:\\Users\\vvv30\\Downloads\\TESTFILES`;

export const getFileFolderList = (path, fileExtension) => {
    fetch(`${MY_SERVER}/getFileFolderList?path=${path}&fileExtension=${fileExtension}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

export const getVersionList = (setState) => {
    fetch(`${MY_SERVER}/getFileFolderList?path=${PATH}`)
    .then((response) => response.json())
    .then((data) => setState(data.folderList.map(list => list.name)));
}