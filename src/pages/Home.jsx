import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";

const Home = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    fetch("https://anime-facts-rest-api.herokuapp.com/api/v1")
      .then((resource) => {
        console.log(resource);
        return resource.json();
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setAnimeList(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const cleanName = (x) => {
    let temp = x;
    temp = temp.toString().trim().split("_").join(" ");
    console.log(temp);
    temp =
      temp.toString().slice(0, 1).toUpperCase() +
      temp.toString().slice(1, temp.length);
    console.log(temp, x);
    return temp;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Fetching data from server...</div>;
  } else {
    return (
      <React.Fragment>
        <h1 className="lead display-6"> HOME 🍙:</h1>
        <table class="table table-striped">
          <thead>
            <tr class="table-primary">
              <th className="display-6 text-primary">#</th>
              <th className="display-6 text-primary text-nowrap">Anime Name</th>
              <th className="display-6 text-primary text-center">Image</th>
            </tr>
          </thead>
          <tbody>
            {animeList.map((anime) => (
              <tr key={anime.anime_id}>
                <td className="lead align-middle text-nowrap">
                  {anime.anime_id}
                </td>
                <td className="lead align-middle">
                  {cleanName(anime.anime_name)}
                </td>
                <td className="text-center">
                  <Image
                    src={anime.anime_img}
                    className="img-thumbnail"
                    style={{ maxWidth: "25%" }}
                  ></Image>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
};

export default Home;
