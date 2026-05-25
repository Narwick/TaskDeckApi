const fs = require('fs');
const path = require('path');

const uploads = path.join(__dirname, `../uploads`);
const webp = path.join(__dirname, `../uploads/webp`);
const achievements = path.join(__dirname, `../uploads/achievements`);
const challenges = path.join(__dirname, `../uploads/challenges`);
const learnings = path.join(__dirname, `../uploads/learnings`);
const users = path.join(__dirname, `../uploads/users`);
// const original = path.join(__dirname, `../uploads/original`);

try {
  if (!fs.existsSync(uploads)) {
    fs.mkdirSync(uploads);
  }
  if (!fs.existsSync(webp)) {
    fs.mkdirSync(webp);
  }
  if (!fs.existsSync(achievements)) {
    fs.mkdirSync(achievements);
  }
  if (!fs.existsSync(challenges)) {
    fs.mkdirSync(challenges);
  }
  if (!fs.existsSync(learnings)) {
    fs.mkdirSync(learnings);
  }
  if (!fs.existsSync(users)) {
    fs.mkdirSync(users);
  }
  // if (!fs.existsSync(original)) {
  //   fs.mkdirSync(original);
  // }


} catch (err) {
  console.error(err);
}
