import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => (
    <Link to="/">
        <img src="/icons/icon3.png" alt="Logo" className="h-8 w-auto fill-current text-white" />
    </Link>
);

export default Logo;