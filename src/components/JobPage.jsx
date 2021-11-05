import React from "react";
// import data from "./data";
import data from "../linkedin.json"
import Job from "./Job";
function JobPage() {
  return (
    <div id="grid">
      {data.map((job) => {
        const { id, company_name, title, location, platform, url } = job;
        return (
          <Job
            id={id}
            company={company_name}
            title={title}
            location={location}
            platform={platform}
            link={url}
          />
        );
      })}
    </div>
  );
}

export default JobPage;
