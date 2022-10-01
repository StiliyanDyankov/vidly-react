import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import SelectMenu from "./selectMenu";
import { Link, Router } from 'react-router-dom';

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

    validate = () => {
        // extracts error obj from joi.validate returned obj
        // validates the state data against defined in extended class schema
        const { error } = Joi.validate(this.state.data, this.schema, {
            abortEarly: false,
        });

        if (!error) return null;

        const errors = {};

        // grabs messages of all errors and stores them in errors obj
        for (let item of error.details) errors[item.path[0]] = item.message;
        return errors;
    };

    // single property validation upon input
    validateProperty = ({ name, value }) => {
        // creates an obj with passed name and value
        const obj = { [name]: value };
        // creates an obj with passed name and value of
        // corresponding schemas value, defined in extended class
        const schema = {
            [name]: this.schema[name],
        };
        
        // validates the created obj against schema
        const { error } = Joi.validate(obj, schema); // err genre

        // if error is defined return it, else return null
        return error ? error.details[0].message : null;
    };

    // takes event arg
    handleSubmit = (e) => {
        e.preventDefault();

        // validating all data in state and set state with all errors
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        // if error object is empty, call doSubmit
        this.doSubmit();
    };

    // takes only currentTarget from passed arg obj and aliases it with input
    handleChange = ({ currentTarget: input }) => {

        // takes a copy of all errors in state
        const errors = { ...this.state.errors };

        // validates passed arg
        const errorMessage = this.validateProperty(input); // err genres


        // if there is an error, store its value in copied state
        if (errorMessage) errors[input.name] = errorMessage;
        // if there isn't an error, delete the property with that name
        else delete errors[input.name];

        //makes a copy of state data obj
        const data = { ...this.state.data };

        // initializes internal state data obj with value of passed input
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    renderButton = (label) => {
        return (
            <button type='submit' value='Submit' disabled={this.validate()} className="btn btn-primary">
                {label}
            </button>
        );
    };

    renderInput(name, label, type = "text") {
        const { data, errors } = this.state;

        return (
            <Input
                type={type}
                name={name}
                label={label}
                value={data[name]}
                onChange={this.handleChange}
                error={errors[name]}
            />
        );
    }

    renderSelect(name, label, src) {
        const { data, errors } = this.state;

        return (
            <SelectMenu
                name={name}
                label={label}
                value={data[name]}
                onChange={this.handleChange}
                error={errors[name]}
                options={src}
            />
        );
    }
}

export default Form;
