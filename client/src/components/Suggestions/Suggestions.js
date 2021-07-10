import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './suggestions.scss';
import Suggestion from './components/Suggestion';

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getSuggestions = async () => {
      const res = await axios.get('/user/suggestions/');

      setSuggestions(res.data.suggestions);
    };

    getSuggestions();
  }, []);

  return (
    <section className='suggestions'>
      <h2>You may know</h2>
      {suggestions.map((suggestion) => (
        <Suggestion
          key={suggestion.id}
          name={suggestion.name}
          profilePic={suggestion.profilePic}
          userTag={suggestion.username}
        />
      ))}
    </section>
  );
};

export default Suggestions;
