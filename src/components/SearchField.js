import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import useDebounce from '../helpers/use-debounce';

export default function SearchField({ handleSearchQuery, error }) {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearchQuery(debouncedSearchTerm)
     }
  },[debouncedSearchTerm, handleSearchQuery])
 
  return (
    <>
      <TextField
        error={error.error}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        inputProps={{ spellCheck: 'false' }}
        id="outlined-basic"
        label= {
          error.error ? error.errMsg
          : 'Search for a location...'
        }
        variant="outlined"
        style={{ margin: '20px 0', width: '20rem' }}
      />
    </>
  );
}
