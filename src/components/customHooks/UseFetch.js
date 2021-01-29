import React, { useState, useEffect }from 'react';

function UseFetch(url, init) {
   const [data, setData] = useState();
   const [error, setError] = useState();

   useEffect(() => {
      async function fetchData() {
         try {
            const res = await fetch(url, init);
            const resData = await res.json();
            setData(resData)
         } catch (error) {
            setError(error)
         }
      }
      fetchData();
   }, [])

   return [data, error];
}

export default UseFetch
