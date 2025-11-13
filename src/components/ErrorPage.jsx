import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='flex min-h-screen flex-col'>
            <NavBar />
            <div className='flex-1 mt-10 flex justify-center flex-col gap-5 items-center'>
                <h1 className='font-bold text-6xl text-red-700'> 404</h1>
                <p className='text-blue-700 text-xl'>Oops! This AI model doesn't exist.</p>
                <Link to='/' className='btn btn-primary'>Back Home</Link>
            </div>
            <Footer />
        </div>
    );
};

export default ErrorPage;