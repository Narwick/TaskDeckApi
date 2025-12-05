import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';
import sharp from 'sharp';

export const arquivoImagemExiste = (pathArquivo: string) => {
  try {
    if (fs.existsSync(pathArquivo)) return true;
    return false;
  } catch (error) {
    console.error('Erro ao verificar a existência da imagem:', error);
    return false;
  }
};

export async function getStatusFile(pathImage: string) {
  return new Promise((resolve, reject) => {
    fs.stat(pathImage, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
}

export const saveFile = async (dirName: string, fileName: string, file: any) => {
  const date_now = new Date();
  const date_month = date_now.getMonth() + 1;

  const ext = path.extname(file.name);

  const fileNameFormatted =
    `${fileName}` +
    `_${date_month}${date_now.getDate()}${date_now.getHours()}${date_now.getMinutes()}${date_now.getMilliseconds()}`;

  const p = path.join(__dirname, `/../uploads/${dirName}/${fileNameFormatted}${ext}`);

  const rawData = fs.readFileSync(file.path);

  fs.writeFileSync(p, rawData);

  return {
    name: fileNameFormatted,
    type: ext.replace('.', ''),
    path: `${dirName}/${fileNameFormatted}${ext}`,
  };
};

export const saveImage = async (dirName: string, fileName: string, file: any) => {
  const date_now = new Date();
  const date_month = date_now.getMonth() + 1;

  const ext = '.webp';

  const fileNameFormatted =
    `${fileName}` +
    `_${date_month}${date_now.getDate()}${date_now.getHours()}${date_now.getMinutes()}${date_now.getMilliseconds()}`;

  const p = path.join(__dirname, `/../uploads/${dirName}/${fileNameFormatted}${ext}`);

  const rawData = fs.readFileSync(file.path);

  let qualityWebp = 90;

  if (file.size > 2000000) {
    qualityWebp = 10;
  } else if (file.size > 1000000) {
    qualityWebp = 40;
  } else if (file.size > 500000) {
    qualityWebp = 70;
  }

  await sharp(rawData).webp({ quality: qualityWebp, force: true }).toFile(p);

  return {
    name: fileNameFormatted,
    type: ext.replace('.', ''),
    path: `${dirName}/${fileNameFormatted}${ext}`,
  };
};

export const createThumbInMemory = async (file: any) => {
  const rawData = fs.readFileSync(file.path);

  return sharp(rawData).resize(150, 150).webp({ quality: 70, force: true }).toBuffer();
};
const saveImageWebp = async (dirName: string, pathImage: string) => {
  if (!arquivoImagemExiste(pathImage)) return;
  const ext = '.webp';
  const extImage = path.extname(pathImage);
  const fileNameFormatted = path.basename(pathImage).replace(extImage, '');

  const p = path.join(__dirname, `/../uploads/${dirName}/${fileNameFormatted}${ext}`);

  const rawData = fs.readFileSync(pathImage);

  const status: any = await getStatusFile(pathImage);

  let qualityWebp = 90;

  if (status.size > 2000000) {
    qualityWebp = 10;
  } else if (status.size > 1000000) {
    qualityWebp = 40;
  } else if (status.size > 500000) {
    qualityWebp = 70;
  }

  await sharp(rawData).webp({ quality: qualityWebp, force: true }).toFile(p);

  return {
    name: fileNameFormatted,
    type: ext.replace('.', ''),
    path: `${dirName}/${fileNameFormatted}${ext}`,
  };
};

export const importFile = (dirName: string, fileName: string, file: any) => {
  const ext = path.extname(file.name);

  const fileNameFormatted = `${fileName}`;

  const p = path.join(__dirname, `../excel/${dirName}/${fileNameFormatted}`);

  const rawData = fs.readFileSync(file.path);

  fs.writeFileSync(p, rawData);

  return {
    name: fileNameFormatted,
    type: ext.replace('.', ''),
    path: `${dirName}/${fileNameFormatted}${ext}`,
  };
};

export const readFile = (dirName: string, fileName: string) => {
  const p = path.join(__dirname, `/../uploads/${dirName}`);

  const fileList = fs.readdirSync(p);

  let file;
  let fileInList;
  for (fileInList of fileList) {
    if (fileName == fileInList) {
      file = fileInList;
    }
  }
  return file ? fs.createReadStream(`${p}/${file}`) : file;
};

export const allFiles = (dirName: string) => {
  const p = path.join(__dirname, `/../uploads/${dirName}`);

  const filesList = fs.readdirSync(p);
  const list = [];
  let fileList;
  for (fileList of filesList) {
    const file = fs.createReadStream(`${p}/${fileList}`);
    list.push(file.path);
  }
  return list;
};

export const deleteFile = (dirName: string, fileName: string) => {
  const p = path.join(__dirname, `/../uploads/${dirName}`);

  const files = fs.readdirSync(p);

  for (const fileInList of files) {
    if (fileName == fileInList) {
      fs.unlinkSync(`${p}/${fileInList}`);
    }
  }
};

export const csvToJson = (file: any) => {
  return csv().fromFile(file.path);
};

export const fileManager = {
  saveFile,
  saveImage,
  createThumbInMemory,
  saveImageWebp,
  importFile,
  readFile,
  allFiles,
  deleteFile,
  csvToJson,
};
