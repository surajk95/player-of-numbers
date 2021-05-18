import React from 'react';
import NoAccess from './mobile screen.svg';
import './index.css';

export default function Mobile() {
    return (
        <div className="mobileContainer">
            <img src={NoAccess} alt="no access" />
        </div>
    )
}