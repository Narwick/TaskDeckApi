const path = require(`path`);
const validaExtensao = (arquivo: any, extAceitas = ['pdf', 'doc', 'docx']) => {
  const ext = path.extname(arquivo.name).replace('.', '');
  let resutl = false;
  extAceitas.forEach((eA) => {
    if (ext === eA) resutl = true;
  });

  return resutl;
};

export { validaExtensao };
