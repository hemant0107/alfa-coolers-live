import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-extrabold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
            Executive Governance // Bikaner
          </span>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-white">
            About Alfa Coolers
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl">
            Meet the leadership driving Alfa Industries forward with unwavering industrial ethics, uncompromising quality, and direct dealer accountability since 2007.
          </p>
        </div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Person 1: Kailash Chandra Rajpurohit */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl transition-all duration-300 hover:border-slate-700">
            <div className="w-full h-80 overflow-hidden rounded-xl border border-slate-800/60 mb-6 bg-slate-950">
              <img 
                src="./partner-kailash-chandra.jpg" 
                alt="Kailash Chandra Rajpurohit" 
                loading="lazy"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase mb-1">Partner // Operations</span>
            <h3 className="text-xl font-black text-white">Kailash Chandra Rajpurohit</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Mechanical Architecture &amp; Die Tooling</p>
          </div>

          {/* Person 2: Vijay Singh Rajpurohit */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl transition-all duration-300 hover:border-slate-700">
            <div className="w-full h-80 overflow-hidden rounded-xl border border-slate-800/60 mb-6 bg-slate-950">
              <img 
                src="./partner-vijay-singh.jpg" 
                alt="Vijay Singh Rajpurohit" 
                loading="lazy"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase mb-1">Partner // Commercial</span>
            <h3 className="text-xl font-black text-white">Vijay Singh Rajpurohit</h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Supply Chain &amp; Pan-India Distribution</p>
          </div>

        </div>
      </div>
    </div>
  );
}