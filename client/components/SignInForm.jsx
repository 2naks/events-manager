import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import { signIn } from '../actions/authAction';

/**
 * React  component for Sign in form
 */
export class SignInForm extends Component {
  /**
   * Make style changes after mounting component
   *
   * @return {undefined}
   */
  componentDidMount() {
    document.body.style.backgroundColor = '#262626';
  }

  /**
   * Event handler for changes in input.
   * Sets the state on changes.
   *
   * @param  {object} e event object
   * @return {undefined}
   */
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Event handler for submitting form
   *
   * @param  {object} e event object
   * @return {object}
   */
  handleSubmit = (e) => {
    e.preventDefault();
    let signInDetails = this.state;
    const { dispatch } = this.props;
    return dispatch(signIn(signInDetails));
  }

  /**
   * React's method to render react component.
   * Renders sign in form
   *
   * @return {object}
   */
  render() {
    if (this.props.status === 'Success') {
      return <Redirect to="/myevents" push />;
    }
    return (
      <div>
        <NavBar page="SignInForm"/>
        <div className="container signup ">
          <div className= "row">
            <div className="container">
              <form action="./authindex.htm">
                <div className="form-group row">
                  <label htmlFor="" className="col-sm-3 col-form-label" />
                  <div className="col-sm-9">
                    { (this.props.status === 'Error') &&
                      <div className="form-group row"
                        style={{ width: '100%', marginRight: 'auto', marginLeft: 'auto' }}
                      >
                        <div className="alert alert-dismissible alert-danger fade show" role="alert">
                          <small>{this.props.message.toString().split(',').join(', ')}</small>
                        </div>
                      </div>
                    }
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Email</label>
                  <div className="col-sm-9">
                    <input type="email" className="form-control"
                      name="email" onChange={this.handleChange}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Password</label>
                  <div className="col-sm-9">
                    <input type="password" className="form-control"
                      name="password"
                      onChange={this.handleChange} placeholder="Password"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="offset-sm-3 col-sm-9">
                    <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Sign In</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

/**
 * Makes redux dispatch method available in this
 * component's props
 *
 * @param  {object} dispatch dispatch method
 * @return {object} props object
 */
const mapDispatchToProps = (dispatch) => ({
  dispatch: (actionObject) => dispatch(actionObject)

});

/**
 * Makes the necessary  redux state available in this
 * component's props
 *
 * @param  {object} state global state
 * @return {object} props object
 */
const mapStateToProps = (state) => ({
  status: state.authReducer.status,
  message: state.authReducer.message
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
