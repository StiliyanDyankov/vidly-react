import React from "react";

const Input = ({name, label, value, onChange, errorCase}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange}     
                name={name}
                id={name}
                type="text"
                className="form-control"
            />
            <small className={errorCase[name]===''?'d-none text-danger fst-italic':'d-block text-danger fst-italic'}>{errorCase[name]}</small>
        </div>
    );
};

export default Input;
