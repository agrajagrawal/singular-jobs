<>
  {" "}
  <h4 className="fw-bold mb-2 text-uppercase align-left">Profile</h4>
  <div className="row">
    <div className="col-12 col-sm-12 col-xs-12 col-lg-6 col-xl-6">
      <div className="form-outline">
        <label className="form-label mt-3 float-left" htmlFor="SoftSkills">
          UserName
        </label>
        <input
          // name="soft_skills"
          type="text"
          // id="SoftSkills"
          className="form-control form-control-lg"
          value={cookies.get("user_username")}
          readOnly
        />
      </div>
    </div>
    <div className="col-12  col-sm-12 col-xs-12 col-lg-6 col-xl-6">
      <div className="form-outline  ">
        <label className="form-label mt-3 float-left" htmlFor="SoftSkills">
          EmailId
        </label>
        <input
          // name="soft_skills"
          type="text"
          // id="SoftSkills"
          className="form-control form-control-lg"
          value={cookies.get("user_mail")}
          // onChange={this.changeHandler}
          readOnly
        />
      </div>
    </div>
  </div>
</>;
