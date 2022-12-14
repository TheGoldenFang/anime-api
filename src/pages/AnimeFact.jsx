import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const AnimeFact = () => {
  const [animeName, setAnimeName] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [factList, setFactList] = useState(0);
  const [retState, setRetState] = useState(<div>HI</div>);
  const url = "https://anime-facts-rest-api.herokuapp.com/api/v1/";
  let ele;

  useEffect(() => {
    if (animeName !== 0) {
      fetch(url + animeName)
        .then((resource) => {
          if (resource.status >= 400) {
            console.log(resource.status);
            throw new Error("Server responds with error!");
          }
          return resource.json();
        })
        .then(
          (result) => {
            setError(null);
            setIsLoaded(true);
            //console.log(result);
            setFactList(result.data);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }
  }, [animeName]);

  useEffect(() => {
    if (error) {
      setRetState(<tr>Error: {error.message}</tr>);
    } else if (!isLoaded) {
      setRetState(<tr></tr>);
    } else {
      setRetState(
        factList.map((fact) => (
          <tr key={fact.fact_id}>
            <td className="p-4">
              <strong>{fact.fact_id}</strong>
            </td>
            <td className="lead display-7">{fact.fact}</td>
          </tr>
        ))
      );
    }
  }, [factList]);

  const handleSubmitClick = () => {
    setAnimeName(cleanInput(ele.value));
  };

  const cleanInput = (str) => {
    let temp = str;
    temp = temp.split(" ").join("_").toLowerCase();
    return temp;
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <div
          className="jumbotron bg-light rounded border border-primary"
          style={{ textAlign: "center", padding: "30px" }}
        >
          <h1 className="lead display-5">Anime Facts 🍖:</h1>
          <br />
          <label style={{ marginRight: "2rem" }}> Anime Name </label>
          <input type="text" id="AniName" ref={(input) => (ele = input)} />
          <br />
          <br />
          <Button variant="primary" onClick={handleSubmitClick}>
            Search
          </Button>
        </div>
      </React.Fragment>
      <hr className="my-4" />
      <table className="table table-striped">
        <thead>
          <tr className="table-primary">
            <th className="display-6 text-primary table-primary">#</th>
            <th className="display-6 text-primary">Fact</th>
          </tr>
        </thead>
        <tbody>{retState}</tbody>
      </table>
    </React.Fragment>
  );
};

export default AnimeFact;
