import { useEffect, useState } from 'react';
import axios from 'axios';

const CatList = () => {
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const response = await axios.get(
          'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=6&api_key=live_gaHyILBm6pvQ3Ho1vnxuTOLqfJSGGVNF0HuhD4hIpSiUWFhJq330NSOgffM9amiI'
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
              <img src={'https://img.voidr.co/the-cat-api/resize:300x/convert:webp/compress:80/fetch/' + cat.url} alt={cat.breeds[0].name} />
              <ul className='info'>
                <li>Breed: {cat.breeds[0].name}</li>
                <li>Origin: {cat.breeds[0].origin}</li>
                <li>Temperament: {cat.breeds[0].temperament}</li>
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default CatList;