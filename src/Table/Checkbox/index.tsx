import React from 'react';
import Classes from './index.module.css';

export interface CheckBoxConfig {
    disabled?: boolean;
    defaultChecked?: boolean;
    preventPropagation?: boolean;
    onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function CheckBox({ disabled = false, defaultChecked = false, onClick, preventPropagation }: CheckBoxConfig) {
    return (
        <label>
            <input
                type="checkbox"
                style={{ display: 'none' }}
                disabled={disabled}
                checked={defaultChecked}
                onClick={preventPropagation ? e => e.stopPropagation() : undefined}
                onChange={onClick} />
            <span className={Classes.checkBox} />
        </label>
    )
}

export default CheckBox