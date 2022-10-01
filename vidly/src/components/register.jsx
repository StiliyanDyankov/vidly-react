import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class Register extends Form {
    state = {
        data: { email: "", password: "", username: "" },
        errors: {},
    };

    schema = {
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().min(5).label("Password"),
        username: Joi.string().required().min(5).label("Username"),
    };

    doSubmit = () => {};

    render() {
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("email", "Email", "email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("username", "Username", "username")}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default Register;
