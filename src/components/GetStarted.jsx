import React from 'react';
import { Link } from 'react-router';

const GetStarted = () => {
    return (
                <section class="bg-linear-to-r from-purple-600 to-indigo-600 py-20 px-6 md:px-20 text-center text-white" id="get-started">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-4xl md:text-5xl font-bold mb-6">
      Get Started with AI Model Manager
    </h2>
    <p class="text-lg md:text-xl text-indigo-100 mb-10 leading-relaxed">
      Ready to explore the world of Artificial Intelligence?  
      Register or log in to create, edit, and manage your own AI models.  
      Join the future of machine learning — it starts here!
    </p>

    <div class="flex flex-col sm:flex-row justify-center gap-4">
      <Link  to='/auth/register'  
         class="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-indigo-50 transition duration-200">
        Register Now
      </Link>
      <Link to='/auth/login' 
         class="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-indigo-700 transition duration-200">
        Log In
      </Link>
    </div>
  </div>
</section>
    );
};

export default GetStarted;