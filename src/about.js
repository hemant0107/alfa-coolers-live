import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-2 text-blue-500">About Alfa Coolers</h1>
        <p className="text-slate-400 mb-10">Meet the leadership driving Alfa Industries forward with quality and trust.</p>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Person 1: Kailash Chandra Rajpurohit */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl">
            <div className="w-full h-80 overflow-hidden rounded-xl border border-slate-800 mb-6 bg-slate-800">
              <img 
                src="/partner-kailash-chandra.jpg" 
                alt="Kailash Chandra Rajpurohit" 
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-xl font-bold text-white">Kailash Chandra Rajpurohit</h3>
            <p className="text-sm text-blue-400 font-medium mt-1">Founder & Managing Director</p>
          </div>

          {/* Person 2: Vijay Singh Rajpurohit */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl">
            <div className="w-full h-80 overflow-hidden rounded-xl border border-slate-800 mb-6 bg-slate-800">
              <img 
                src="/partner-vijay-singh.jpg" 
                alt="Vijay Singh Rajpurohit" 
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
            <h3 className="text-xl font-bold text-white">Vijay Singh Rajpurohit</h3>
            <p className="text-sm text-blue-400 font-medium mt-1">Operations & Leadership</p>
          </div>

        </div>
      </div>
    </div>
  );
}