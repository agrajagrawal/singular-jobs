import React from "react";

function Profile() {
  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 ">
            <div className="card ">
              {/* bg-dark text-white */}
              <div className="card-body text-center">
                <div className="card-body p-5 text-center">
                  <div className=" pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Profile</h2>
                    <p className=" mb-5">
                      Keep Your profile updated for better Feed!
                    </p>
                    {/* text-white-50 */}
                    <div className="row">
                      <div className="col col-lg-6 col-sm-12">
                        <div className="form-outline">
                          <label className="form-label mt-2" for="typeEmailX">
                            Email
                          </label>
                          <input
                            type="email"
                            id="typeEmailX"
                            className="form-control form-control-lg"
                          />
                          <div className="form-outline  ">
                            <label className="form-label mt-2" for="typePasswordX">
                              Password
                            </label>
                            <input
                              type="password"
                              id="typePasswordX"
                              className="form-control form-control-lg"
                            />
                          </div>
                          <div className="form-outline  ">
                            <label className="form-label mt-2" for="typePasswordX">
                              Password
                            </label>
                            <input
                              type="password"
                              id="typePasswordX"
                              className="form-control form-control-lg"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col col-lg-6 col-sm-12">
                        <div className="form-outline">
                          <label className="form-label mt-2" for="typeEmailX">
                            Email
                          </label>
                          <input
                            type="email"
                            id="typeEmailX"
                            className="form-control form-control-lg"
                          />
                          <div className="form-outline  ">
                            <label className="form-label mt-2" for="typePasswordX">
                              Password
                            </label>
                            <input
                              type="password"
                              id="typePasswordX"
                              className="form-control form-control-lg"
                            />
                          </div>
                          <div className="col-lg-6 mt-2">
                        <button
                          className="btn btn-dark btn-lg px-5 ml-5 mt-3"
                          type="submit"
                        >
                          Update Profile
                        </button>
                      </div>
                        </div>
                      </div>
                    </div>

                    
                      
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;


