import React from 'react';
import './suggestions.scss';
import Suggestion from './components/Suggestion';
import profilePic from '../../assets/img/profile_pic.jpg';

const Suggestions = () => {
  const pathName = window.location.pathname;

  return (
    <section className='suggestions'>
      <h2>You may know</h2>
      <Suggestion
        name='Clement Mihailescu'
        profilePic={profilePic}
        userTag='clemmihai'
      />
      <Suggestion
        name='Clement Mihailescu'
        profilePic={profilePic}
        userTag='clemmihai'
      />
      <Suggestion
        name='Clement Mihailescu'
        profilePic={profilePic}
        userTag='clemmihai'
      />
      <Suggestion
        name='Clement Mihailescu'
        profilePic={profilePic}
        userTag='clemmihai'
      />
      <Suggestion
        name='Clement Mihailescu'
        profilePic={profilePic}
        userTag='clemmihai'
      />
    </section>
  );
};

export default Suggestions;
