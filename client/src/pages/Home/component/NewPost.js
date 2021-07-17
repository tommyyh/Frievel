import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './newPost.scss';
import { SET_POSTS } from '../../../actions/posts';

const NewPost = ({ newPostOpen, setNewPostOpen }) => {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState({
    content: '',
    file: '',
  });
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef();
  const profilePic = useSelector((state) => state.profilePic);

  const inputResize = (e) => {
    // Always end at the bottom of the element
    e.scrollTop = e.scrollHeight - e.clientHeight;

    // If height > 176 - add scrollbar instead of increasing the height
    if (e.scrollHeight > 176) {
      e.style.height = '';
      e.style.height = '11rem';
      e.style.overflow = 'initial';

      return;
    }

    // Increase height
    e.style.height = '';
    e.style.overflow = 'hidden';
    e.style.height = e.scrollHeight / 16 + 'rem';
  };

  const publish = async () => {
    setProcessing(true);
    const data = new FormData();

    data.append('content', newPost.content);
    data.append('file', newPost.file);

    const res = await axios.post('/post/new-post/', data);
    setProcessing(false);

    if (res.data.status === 201) {
      setNewPost({ ...newPost, content: '', file: '' });
      inputRef.current.style.height = '2.5rem';
      inputRef.current.style.overflowY = 'hidden';

      // Set new post to state
      dispatch(SET_POSTS([res.data.new_post, ...posts]));
      setNewPostOpen(false);
    }
  };

  return (
    <section
      className={
        !newPostOpen ? 'new_post_menu' : 'new_post_menu new_post_menu_open'
      }
    >
      <div
        className='close_newPost'
        onClick={() => setNewPostOpen(!newPostOpen)}
      ></div>
      <div className='new_post_form'>
        <span className='new_post_form_top'>
          <img src={profilePic} alt='User profile' />
          <textarea
            type='text'
            name='new_post_input'
            placeholder="What's new today?"
            onChange={(e) => {
              setNewPost({ ...newPost, content: e.target.value });
              inputResize(e.target);
            }}
            value={newPost.content}
            autoCorrect='true'
            spellCheck='true'
            maxLength='280'
            ref={inputRef}
          ></textarea>
        </span>
        <div className='new_post_form_bottom'>
          <span>
            <div className='file_input_div'>
              <svg
                width='1.85rem'
                height='1.85rem'
                viewBox='0 0 31 31'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M25.5104 2.58334H5.48959C3.88793 2.58334 2.58334 3.88793 2.58334 5.48959V25.5104C2.58334 27.1121 3.88793 28.4167 5.48959 28.4167H25.5104C27.1121 28.4167 28.4167 27.1121 28.4167 25.5104V5.48959C28.4167 3.88793 27.1121 2.58334 25.5104 2.58334ZM5.48959 4.52084H25.5104C26.0439 4.52084 26.4792 4.95614 26.4792 5.48959V17.9878L21.4959 13.0045C21.3144 12.8228 21.0682 12.7206 20.8113 12.7203H20.8075C20.6794 12.7201 20.5526 12.7455 20.4345 12.7952C20.3165 12.8449 20.2096 12.9179 20.1203 13.0097L14.5442 18.6723L12.2024 16.3396C12.0209 16.1579 11.7746 16.0557 11.5178 16.0554C11.2685 16.0167 11.0076 16.1588 10.8268 16.3486L4.52084 22.7876V5.48959C4.52084 4.95614 4.95614 4.52084 5.48959 4.52084ZM4.52859 25.5492L11.5268 18.4011L19.6411 26.4792H5.48959C5.24058 26.4774 5.00182 26.3798 4.82288 26.2066C4.64394 26.0334 4.53855 25.798 4.52859 25.5492ZM25.5104 26.4792H22.3846L15.9172 20.0376L20.8152 15.0647L26.4792 20.7274V25.5104C26.4792 26.0439 26.0439 26.4792 25.5104 26.4792Z'
                  fill='#A1A4A8'
                />
                <path
                  d='M11.4545 12.7242C12.5545 12.7242 13.4462 11.8325 13.4462 10.7325C13.4462 9.63246 12.5545 8.74072 11.4545 8.74072C10.3545 8.74072 9.46274 9.63246 9.46274 10.7325C9.46274 11.8325 10.3545 12.7242 11.4545 12.7242Z'
                  fill='#A1A4A8'
                />
              </svg>
              <input
                type='file'
                alt='File input'
                id='file_input'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (file && file.type.substr(0, 5) === 'image') {
                    setNewPost({ ...newPost, file: file });
                  } else {
                    setNewPost({ ...newPost, file: null });
                  }
                }}
              />
            </div>
          </span>
          {!newPost.content ? (
            <button
              onClick={publish}
              disabled
              style={{ cursor: 'not-allowed', background: '#3a3b3c' }}
            >
              {!processing ? 'Publish' : 'Publishing...'}
            </button>
          ) : (
            <button onClick={publish} disabled={!processing ? false : true}>
              {!processing ? 'Publish' : 'Publishing...'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewPost;
