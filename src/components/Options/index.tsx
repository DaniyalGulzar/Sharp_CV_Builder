import React from 'react';

interface OptionProps {
    label: string;
    value: string;
    name: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Option: React.FC<OptionProps> = ({ label, value, name, checked, onChange }) => {
    return (
        <div className={`flex justify-between items-center rounded-xl border px-5 py-8 ${checked ? 'border-6B84FE' : 'border-666666'}`}>
            <span className={` font-medium text-xl ${checked ? 'text-6B84FE' : 'text-555370'}`}>{label}</span>
            <input
                type="radio"
                className={`form-radio h-5 w-5 ${checked ? 'custom-radio' : ''}`}
                value={value}
                name={name}
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
};

export default Option;
