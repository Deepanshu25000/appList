import React, { Fragment, useState, useEffect } from "react";
import history from "./../history";
const AppList = () => {
  const [topApps, setTopApps] = useState([]);
  const getApps = async () => {
    try {
      const response = await fetch("http://localhost:5000/topapps");
      const jsonData = await response.json();
      setTopApps(jsonData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getApps();
  }, []);
  return (
    <Fragment>
      <h1 className="text-center mt-5">Top Apps List</h1>
      <div className="container">
        <div className="row align-items-start">
          {topApps.map(topApp => (
            <div
              key={topApp.appId}
              className="col-md-3 mt-5 panel panel-default"
              width="500px"
              height="500px"
            >
              <div
                className="panel-body bg-gradient-primary bg-dark text-white"
                onClick={() => history.push("/appdetails/" + topApp.appId)}
              >
                <span>{topApp.title}</span>
                <img
                  src={topApp.icon}
                  alt={topApp.appId}
                  width="100px"
                  height="100px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default AppList;
