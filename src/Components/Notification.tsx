import React, { useEffect, useState } from 'react';
// import GetToken from '../Services/CloudMessageService';

export default function Notification() {
  const [isTokenFound, setTokenFound] = useState(false);

  useEffect(() => {
    // GetToken();
    // async function TokenFunction() {
    //   const data = await GetToken(setTokenFound);
    //   if (data) {
    //     console.log(data);
    //   }
    //   return data;}
    // TokenFunction();
  }, []);
  return <> </>;
}
