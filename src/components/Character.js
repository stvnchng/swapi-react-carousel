import { useEffect, useState } from "react";

import axios from "axios";

const Character = ({ char }) => {
  // Shoutout to swapi for providing links in http instead of https
  const api = char.replace(/^http:\/\//i, "https://");

  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [working, setWorking] = useState(true);

  useEffect(() => {
    loadName();
  }, []);

  const loadName = () => {
    fetchName().then((data) => {
      setName(data.name);
      loadSpecies(data.species.length > 0 ? data.species : "");
    });
  };

  const fetchName = () => {
    return axios
      .get(api)
      .then(({ data }) => data)
      .catch((err) => {
        console.error(err);
      });
  };

  const loadSpecies = (api) => {
    fetchSpecies(api).then((data) => {
      setSpecies(data ?? "Human");
      setWorking(false);
    });
  };

  const fetchSpecies = (api) => {
    if (api.length) {
      api = api[0].replace(/^http:\/\//i, "https://");
    }
    return axios
      .get(api)
      .then(({ data }) => data?.name)
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {working ? (
        <div>Loading...</div>
      ) : (
        <div className="content">
          <div>{name}</div>
          <div>{"Species: " + species}</div>
        </div>
      )}
    </>
  );
};

export default Character;
