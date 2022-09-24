import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const SpecificFact = () => {
  const [animeName, setAnimeName] = useState(0);
  const [factId, setFactId] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fact, setFact] = useState([]);
  const [retState, setRetState] = useState(<div>HI</div>);

  const url = "https://anime-facts-rest-api.herokuapp.com/api/v1/";
  let tempName, tempFact;

  useEffect(() => {
    console.log(url + animeName + "/" + factId);
    fetch(url + animeName + "/" + factId)
      .then((resource) => {
        if (resource.status >= 400) {
          //console.log(resource.status);
          throw new Error("Server responds with error!");
        }
        console.log(resource);
        return resource.json();
      })
      .then(
        (result) => {
          setError(null);
          setIsLoaded(true);
          //console.log(result);
          setFact(result.data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [animeName, factId]);

  useEffect(() => {
    console.log(fact);
    if (error) {
      console.log("errMsg");
      setRetState(<div>Error: {error.message}</div>);
    } else if (!isLoaded) {
      console.log("loadMsg");
      setRetState(<div></div>);
    } else {
      console.log("factMsg");
      setRetState(
        <React.Fragment>
          <br />
          <p className="p-2">
            <strong>
              {cleanName(animeName)}'s Fact {fact.fact_id}
            </strong>{" "}
            : <em>{fact.fact}</em>
          </p>
          <br />
        </React.Fragment>
      );
    }
  }, [fact]);

  const handleSubmitClick = () => {
    console.log("submit");
    setAnimeName(tempName.value);
    setFactId(tempFact.value);
  };

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

  return (
    <React.Fragment>
      <React.Fragment>
        <div
          className="jumbotron bg-light rounded border border-primary"
          style={{ textAlign: "center", padding: "30px" }}
        >
          <h1 className="lead display-5">Specific Facts 🍜:</h1>
          <br />
          <label style={{ marginRight: "2rem" }}> Anime Name </label>
          <input type="text" id="AniName" ref={(input) => (tempName = input)} />
          <br />
          <br />
          <label style={{ marginRight: "2rem" }}> Fact ID </label>
          <input type="text" id="facId" ref={(input) => (tempFact = input)} />
          <br />
          <br />
          <Button variant="primary" onClick={handleSubmitClick}>
            Search
          </Button>
        </div>
      </React.Fragment>
      <hr className="my-4" />
      <div className="lead bg-primary text-white text-center rounded">
        {retState}
      </div>
    </React.Fragment>
  );
};

export default SpecificFact;
