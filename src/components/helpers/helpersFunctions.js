const fetchData = async (url, init) => {
  try {
    const res = await fetch(url, init);
    const resData = await res.json();
    return resData;
  } catch (error) {
    return error;
  }
};

export { fetchData };
