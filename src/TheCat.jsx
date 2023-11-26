import { useEffect, useState } from 'react';
import axios from 'axios';

const CatList = () => {
  const [catData, setCatData] = useState([]);
  const voidrUrl = `https://img.voidr.co/${import.meta.env.VITE_PROJECT_NAME}/resize:300x/convert:webp/compress:80/fetch/`;

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const apiUrl = 'https://api.thecatapi.com/v1/images/search';
        const urlParameters = '?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=6';
        const apiKey = `&api_key=${import.meta.env.VITE_API_KEY}`
        ;

        const response = await axios.get(
          apiUrl + urlParameters + apiKey
        );
        setCatData(response.data);
      } catch (error) {
        console.error('Error fetching cat data:', error);
      }
    };

    fetchCatData();
  }, []); 

  return (
    <div>
      <div className="header">
        <div className="container">
          <h1>My Favorite Cats</h1>
        </div>
      </div>
      
      <main className="container">
        <ul className="flex-container">
          {catData.map((cat) => (
            <li className="flex-item" key={cat.id}>
              <img src={voidrUrl + cat.url} alt={cat.breeds[0].name} />
              <ul className='info'>
                <li className='breed'>Breed: {cat.breeds[0].name}</li>
                <li className='origin'>Origin: {cat.breeds[0].origin}</li>
                <li className='temperament'>{cat.breeds[0].temperament}</li>
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default CatList;