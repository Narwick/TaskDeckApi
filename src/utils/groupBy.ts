function groupBy(array: any, key: any) {
  return array.reduce((acc: any, item: any) => {
    if (!acc[item[key]]) acc[item[key]] = [];
    acc[item[key]].push(item);
    return acc;
  }, {});
}

function groupByII(array: any, key: any) {
  return array.reduce(
    (acc: any, item: any) => ({
      ...acc,
      [item[key]]: [...(acc[item[key]] ?? []), item],
    }),
    {},
  );
}
export { groupBy, groupByII };
