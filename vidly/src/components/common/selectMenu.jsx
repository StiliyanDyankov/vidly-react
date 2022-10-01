import React from "react";

const SelectMenu = ({name, label, value, error, options, onChange}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select className="form-control" id={name} value={value||''} onChange={onChange} name={name}>
                <option value="" className="d-none"></option>
                {options.map((option) => (
                    <option key={option._id} value={option.name} >
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default SelectMenu;
