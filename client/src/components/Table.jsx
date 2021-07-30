import React, { useEffect, useContext } from 'react';
import shortUrlGen from '../api/shortUrlGen';
import { UrlContext } from '../context/urlContext';

const Table = () => {
  const { urls, setUrls } = useContext(UrlContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await shortUrlGen.get('/');
        setUrls(response.data.data.urls);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await shortUrlGen.delete(`${id}`);
      setUrls(
        urls.filter((url) => {
          return url.id !== id;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  // const handleClick = async (id) => {
  //   try {
  //     const response = await shortUrlGen.get(`${id}`);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return (
    <div>
      <table className='table table-responsive table-primary table-hover'>
        <thead>
          <tr>
            <th scope='col' className='center'>
              Full URL
            </th>
            <th scope='col' className='center'>
              Short URL
            </th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => {
            return (
              <tr key={url.id} className='table-light'>
                <td>
                  <button className='btn' onClick={() => handleDelete(url.id)}>
                    <i className='bi bi-trash'></i>
                  </button>
                  <a href={url.fullurl}>{url.fullurl}</a>
                </td>
                <td className='center'>
                  <a href={url.fullurl}>{url.shorturl}</a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
