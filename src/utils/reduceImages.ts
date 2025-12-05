import sharp from 'sharp';

async function reduceImages(buffer: Buffer): Promise<Buffer> {
    console.log('buffer:', buffer);
    let qualidade = 80;
    let largura = 400;
  
    for (let i = 0; i < 5; i++) {
      const comprimida = await sharp(buffer)
        .resize({ width: largura })
        .jpeg({ quality: qualidade })
        .toBuffer();
  
      if (comprimida.length <= 65535) return comprimida;
  
      qualidade -= 10;
      largura -= 50;
    }
  
    throw new Error('A imagem é muito grande. Tente enviar uma imagem menor (até 350x350px).');
  }
  
  export default reduceImages;