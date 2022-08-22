//nodelibrary.js

const MY_SERVER = `http://192.168.55.120:3002`;

export const getFileFolderList = (path) => {
    fetch(`${MY_SERVER}/getFileFolderList?path=${path}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}