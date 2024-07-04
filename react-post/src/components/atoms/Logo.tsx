import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => (
    <Link to="/">
        <img src="/icons/icon4.jpg" alt="Logo" className="h-12 w-auto fill-current ml-4" />
    </Link>
);

export default Logo;
