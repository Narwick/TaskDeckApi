const fs = require('fs');
const path = require('path');

const uploads = path.join(__dirname, `../uploads`);
const webp = path.join(__dirname, `../uploads/webp`);
// const original = path.join(__dirname, `../uploads/original`);

try {
  if (!fs.existsSync(uploads)) {
    fs.mkdirSync(uploads);
  }  
  if (!fs.existsSync(webp)) {
    fs.mkdirSync(webp);
  }
  // if (!fs.existsSync(original)) {
  //   fs.mkdirSync(original);
  // }


} catch (err) {
  console.error(err);
}
