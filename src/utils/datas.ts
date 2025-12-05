
function obterProximasDatas(numDias: any) {
  const datas = [];
  const dataAtual = new Date();

  for (let i = 0; i < numDias; i++) {
    const data = new Date(dataAtual);
    data.setDate(data.getDate() + i);
    datas.push(data.toISOString().split('T')[0]);
  }

  return datas;
}

export {
  obterProximasDatas,
};
