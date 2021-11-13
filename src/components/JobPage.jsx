import React from "react";
// import data from "./data";
import data from "../linkedin.json"
import Job from "./Job";
function JobPage() {
  let count = 0;
  return (<>
    <div className="row job-row">
      {
       data.map((job) => {
        count = count + 1;
        const { id, company_name, title, location, platform, url } = job;
        return (
          <Job
            count = {count}
            id={id}
            company={company_name}
            title={title}
            location={location}
            platform={platform}
            link={url}
          />
        );
      })
      }
    </div>
    </>
  );
}

export default JobPage;
