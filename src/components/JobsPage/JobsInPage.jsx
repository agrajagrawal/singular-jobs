import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import Job from './Job';

// Example items, to simulate fetching from another resources.

function JobsInPage({ currentItems }) {
  console.log("Jobsinpage");
  console.log(currentItems);
  return (
    <>
      {/* {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))} */}
        <div className="job-row row">
            {currentItems && currentItems.map((item) =>{
                const { id, company_name, job_title, location, listed_on, url } = item;
                return (
                  <Job
                    // count = {count}
                    id={id}
                    company={company_name}
                    title={job_title}
                    location={location}
                    platform={listed_on}
                    link={url}
                  />
                );
              })

            }
        </div>
        {/* <div className="row job-row">
          {data.map((job) => {
            // count = count + 1;
            const { id, company_name, title, location, platform, url } = job;
            return (
              <Job
                // count = {count}
                id={id}
                company={company_name}
                title={title}
                location={location}
                platform={platform}
                link={url}
              />
            );
          })}
        </div> */}
    </>
  );
}
export default JobsInPage; 
