import React from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import { Autocomplete, debounce } from '@mui/material';
import { fetchData } from './lib/marvel';

interface Character {
  id: number;
  name: string;
  description: string;
}

function App() {
  const [characters, setCharacters] = React.useState<Character[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetchData(event.target.value).then((data) => {
      const characters = data.map(function(rawChar: any) {
        const char: Character = {
          id: rawChar.id,
          name: rawChar.name,
          description: rawChar.description
        }

        return char
      });

      setCharacters(characters);
    });
  }

  const debouncedOnChange = debounce(handleChange, 1000);

  return (
    <div className="App">
      <header className="App-header">
        <TextField id="outlined-basic" label="Search" variant="outlined" onChange={debouncedOnChange} />
      </header>

      <ul>
        {characters.map((character) => (<li key={character.id}>{character.name}</li>))}
      </ul>
    </div>
  );
}

export default App;
