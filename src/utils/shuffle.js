const shuffle = (arr) => {
  const s = arr
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);

  console.log(s);

  return s;
};

export default shuffle;
