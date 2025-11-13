import React from 'react';

const AboutAi = () => {
    return (
        <section class="bg-linear-to-r from-indigo-50 to-purple-50 py-16 px-6 md:px-20" id="about-ai-models">
            <div class="max-w-5xl mx-auto text-center">
                <div className="text-center text-5xl font-bold mt-15 border-b-2 border-b-blue-400 w-1/2 mb-11 mx-auto pb-5">About <span className="text-blue-800 font-black">AI</span> Model</div>
                <p class="text-gray-600 text-lg md:text-xl leading-relaxed mb-12">
                    AI models are computer programs designed to learn from data and make intelligent decisions.
                    They use techniques like <span class="font-semibold text-gray-800">neural networks</span>
                    to identify patterns, understand language, recognize images, and even generate creative content.
                    These models power everyday technologies — from chatbots and voice assistants to self-driving cars and medical image analysis.
                </p>

                <div class="grid md:grid-cols-3 gap-8">

                    <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                        <div class="text-indigo-600 text-5xl mb-4">🧠</div>
                        <h3 class="text-xl font-semibold mb-2 text-gray-800">Neural Networks</h3>
                        <p class="text-gray-600">
                            Inspired by the human brain, neural networks process data through layers of nodes to make predictions and decisions.
                        </p>
                    </div>


                    <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                        <div class="text-indigo-600 text-5xl mb-4">🤖</div>
                        <h3 class="text-xl font-semibold mb-2 text-gray-800">Chatbots & NLP</h3>
                        <p class="text-gray-600">
                            Natural Language Processing (NLP) enables models to understand and respond to human language — like how chatbots or translators work.
                        </p>
                    </div>


                    <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
                        <div class="text-indigo-600 text-5xl mb-4">📸</div>
                        <h3 class="text-xl font-semibold mb-2 text-gray-800">Image Recognition</h3>
                        <p class="text-gray-600">
                            AI models can identify faces, objects, and scenes from images — helping with security, healthcare, and autonomous driving.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutAi;