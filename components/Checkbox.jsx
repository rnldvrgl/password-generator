import React from "react";

const Checkbox = ({ id, label, checked, onChange }) => {
    return (
        <div className="flex items-center mr-4">
            <input
                id={id}
                type="checkbox"
                className="w-4 h-4 bg-gray-100 border-gray-300 rounded accent-primary text-primary focus:ring-primary focus:ring-2"
                checked={checked}
                onChange={onChange}
            />
            <label htmlFor={id} className="ml-2 text-base font-medium text-gray-900 dark:text-gray-300">
                {label}
            </label>
        </div>
    );
};

export default Checkbox;
