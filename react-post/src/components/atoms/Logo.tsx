import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => (
    <Link to="/">
        <img src="/icons/icon2.png" alt="Logo" className="h-8 w-auto" />
    </Link>
);

export default Logo;