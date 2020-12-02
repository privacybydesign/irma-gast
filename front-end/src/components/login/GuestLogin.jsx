import React from "react";
import { withTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";

class GuestLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", error: "" };
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.email);
  };

  onEmailChange = (event) => {
    let email = event.target.value;
    this.setState({ email: email });
  };

  render() {
    return (
      <>
        <h2>{this.props.t(`headerguest`)}</h2>
        <p className="center-content">{this.props.t(`p1guest`)}</p>
        <div>
          <form id="email-form" onSubmit={this.handleSubmit}>
            <TextField
              type="email"
              fullWidth
              className="form-control"
              aria-describedby="emailHelp"
              value={this.state.email}
              onChange={this.onEmailChange}
              label={this.props.t("email")}
              required
            />
            <div className="flex-container flex-item-single-centered">
              <button type="submit" className="btn irma-btn-secondary">
                {this.props.t("guestregisterbuttontext")}
              </button>{" "}
            </div>
          </form>
        </div>
        <h4 className="center-content">{this.props.t("headerloginirmaguest")}</h4>
        <div style={{ height: "30px" }} />
        <section className={"irma-web-center-child"}>
          <section id={"irma-web-form"} />
        </section>
        <div style={{ height: "60px" }} />
        <h4 className="center-content">{this.props.t("noapp")}</h4>
        <p>{this.props.t("p2")}</p>
        <div className="center-content">
          <a href="https://irma.app" className="btn irma-btn-secondary">
            {this.props.t("install")}
          </a>
        </div>
        <p dangerouslySetInnerHTML={{ __html: this.props.t("p3") }}></p>
      </>
    );
  }
}

export default withTranslation("login")(GuestLogin);
