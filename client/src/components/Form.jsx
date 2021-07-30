import React, { useState, useContext } from 'react';
import shortUrlGen from '../api/shortUrlGen';
import { nanoid } from 'nanoid';
import { UrlContext } from '../context/urlContext';

const Form = () => {
  const [fullUrl, setfullUrl] = useState('');
  const { addUrls } = useContext(UrlContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const shortUrl = nanoid(10);
      const response = await shortUrlGen.post('', {
        fullUrl: fullUrl,
        shortUrl: shortUrl
      });
      addUrls(response.data.data.url);
      setfullUrl('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form action='' method='POST' className='my-4'>
        <div className='mb-3 row'>
          <label for='fullUrl' className='col-sm-1 col-form-label center'>
            Url
          </label>
          <div class='col-sm-9'>
            <input
              required
              placeholder='Put your URL here'
              type='url'
              name='fullUrl'
              id='fullUrl'
              className='form-control col-sm-2 col-form-label'
              value={fullUrl}
              onChange={(e) => setfullUrl(e.target.value)}
            />
          </div>
          <div className='col-sm-2'>
            <button
              className='btn btn-success center'
              type='submit'
              onClick={handleSubmit}>
              Shrink
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
