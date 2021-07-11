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
            <svg
              width='1.85rem'
              height='1.85rem'
              viewBox='0 0 31 31'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='newPost_emoji'
            >
              <path
                d='M15.5 29.3854C7.84301 29.3854 1.61459 23.157 1.61459 15.5C1.61459 7.84301 7.84301 1.61459 15.5 1.61459C23.157 1.61459 29.3854 7.84301 29.3854 15.5C29.3854 23.157 23.157 29.3854 15.5 29.3854ZM15.5 3.55209C8.91251 3.55209 3.55209 8.91251 3.55209 15.5C3.55209 22.0875 8.91251 27.4479 15.5 27.4479C22.0875 27.4479 27.4479 22.0875 27.4479 15.5C27.4479 8.91251 22.0875 3.55209 15.5 3.55209Z'
                fill='#A1A4A8'
              />
              <path
                d='M15.5 22.1069C14.302 22.1097 13.1227 21.81 12.0714 21.2356C11.0201 20.6611 10.1308 19.8306 9.48601 18.8209C9.41721 18.714 9.37018 18.5946 9.34762 18.4695C9.32505 18.3444 9.3274 18.2161 9.35452 18.0919C9.38163 17.9677 9.43299 17.8501 9.50565 17.7458C9.57831 17.6414 9.67083 17.5525 9.77793 17.484C9.88481 17.4148 10.0043 17.3675 10.1296 17.3447C10.2549 17.322 10.3834 17.3242 10.5078 17.3514C10.6322 17.3785 10.75 17.43 10.8544 17.5029C10.9588 17.5757 11.0477 17.6685 11.1161 17.7759C12.081 19.2768 13.7201 20.172 15.5013 20.172C17.2825 20.172 18.9216 19.2768 19.8878 17.7772C19.9563 17.6699 20.0453 17.5772 20.1497 17.5045C20.2542 17.4318 20.372 17.3804 20.4964 17.3534C20.6208 17.3264 20.7493 17.3242 20.8745 17.3471C20.9997 17.37 21.1192 17.4174 21.226 17.4866C21.6781 17.7759 21.8072 18.3753 21.5179 18.8248C20.8724 19.8345 19.9827 20.6651 18.931 21.2397C17.8793 21.8143 16.6997 22.1143 15.5013 22.1121L15.5 22.1069Z'
                fill='#A1A4A8'
              />
              <path
                d='M19.0366 14.1257C20.0909 14.1257 20.9457 13.2709 20.9457 12.2166C20.9457 11.1622 20.0909 10.3075 19.0366 10.3075C17.9822 10.3075 17.1275 11.1622 17.1275 12.2166C17.1275 13.2709 17.9822 14.1257 19.0366 14.1257Z'
                fill='#A1A4A8'
              />
              <path
                d='M11.9634 14.1257C13.0178 14.1257 13.8725 13.2709 13.8725 12.2166C13.8725 11.1622 13.0178 10.3075 11.9634 10.3075C10.909 10.3075 10.0543 11.1622 10.0543 12.2166C10.0543 13.2709 10.909 14.1257 11.9634 14.1257Z'
                fill='#A1A4A8'
              />
            </svg>
          </span>
          {!newPost.content ? (
            <button
              onClick={publish}
              disabled
              style={{ cursor: 'not-allowed' }}
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
