import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AppDetails = () => {
  const [Details, setDetails] = useState([]);
  let { appId } = useParams();
  const getDetails = async (appId) => {
    try {
      if (appId) {
        const response = await fetch(
          "http://localhost:5000/appdetails/" + appId
        );
        const jsonDetails = await response.json();
        setDetails(jsonDetails);
        console.log(Details);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDetails(appId);
  }, []);
  return (
    <Fragment>
      <h1 className="text-center mt-5">App Details </h1>
      <h2 className="text-center mt-5">Title: {Details.title}</h2>
      <center>
        <img
          className="mt-5"
          src={Details.icon}
          alt={Details.appId}
          width="200px"
          height="200px"
        />
      </center>
      <h2 className="text-center mt-5">Summary: {Details.summary}</h2>
      <h6 className="text-center mt-5">Description: {Details.description}</h6>
      <h3 className="text-center mt-5">Developed By: {Details.developer}</h3>
      <h3 className="text-center mt-5">Rating: {Details.scoreText}</h3>
      <div
        key={Details.appId}
        className="col-md-12 mt-5 panel panel-default"
        width="500px"
        height="500px"
      ></div>
    </Fragment>
  );
};

export default AppDetails;
