var md5 = require('md5');

// Sample code to search and fetch data from marvel API.

export const fetchData = async (searchTerm) => {
  const term = searchTerm;
  const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
  const hash = md5(Date.now()+process.env.REACT_APP_MARVEL_PRIVATE_KEY+process.env.REACT_APP_MARVEL_PUBLIC_KEY)
  try {
    const res = await fetch(
      `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${term}&apikey=${publicKey}&hash=${hash}`
    );
    const data = await res.json();

    return data.data.results.map((rawCharacter) => {
      const character = {
        id: rawCharacter.id,
        name: rawCharacter.name,
        description: rawCharacter.description,
      };
      return character;
    });
  } catch (error) {
    console.log("Error fetching data. ", error);
  }
};
