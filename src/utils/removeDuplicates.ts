function removeDuplicates(array: any) {
  const uniqueArray: any = [];
  array.forEach((item: any) => {
    if (!uniqueArray.includes(item)) {
      uniqueArray.push(item);
    }
  });
  return uniqueArray;
}

export { removeDuplicates };
