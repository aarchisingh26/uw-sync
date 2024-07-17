"use client"

import React, { useState, useEffect, useRef } from "react";
import ICAL from "ical.js";
import SearchExams from "@/components/search";
import Navbar from "@/components/navbar";
import { HelpCircle } from 'lucide-react';
import Footer from "@/components/footer";

const RobotoFontStyle = {
  fontFamily: 'Roboto, sans-serif',
};

const GlorifyFontStyle = {
  fontFamily: 'Glorify, sans-serif',
};

const ManropeFontStyle = {
  fontFamily: 'Manrope, sans-serif',
};

export default function Home() {

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  const handleScroll = () => {
    const element = sectionRef.current;
    const boundingBox = element.getBoundingClientRect();
    const isVisible = boundingBox.top <= window.innerHeight - boundingBox.height / 2;
    setIsVisible(isVisible);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      sectionRef.current.classList.add('animated-text');
    }
  }, [isVisible]);

  return (
    <>
    <Navbar />
      <div className="section grain relative h-screen overflow-y-hidden overflow-x-hidden home">

        <div className="lg:w-1/2 sm:w-1/2" style={{ position: 'absolute', bottom: 0, left: 0, padding: '20px', paddingLeft: '50px', paddingRight:'50px' }}>
        {/* <div className="" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', maxWidth: '80%', padding: '20px', paddingLeft: '50px', '@media (min-width: 1900px)': { maxWidth: '50%' } }}> */}

          <p className="text-md text-gray-300 font-light italic pb-7" style={ManropeFontStyle}>
            Made Exclusively for University of Waterloo Students
          </p>
          <p className="text-white sm:text-4xl md:text-2xl lg:text-7xl text-4xl font-bold line-clamp-none animated-text1" style={ManropeFontStyle}>
          {/* scheduling made easy */}
            Scheduling Meets Convenience<br />
            <span className="font-normal sm:text-md md:text-md lg:text-2xl text-xl line-clamp-none pt-10 text-gray-300">
              Manually entering your exam dates is annoying and time-consuming.
              UW Sync does this for you.<br />
            </span>

            <br />

          </p>

          <div className="pb-8">
            {/* <button className="outline outline-2 outline-white rounded-full text-white font-normal p-3" style={ManropeFontStyle}>
              How It Works
            </button> */}

            <p className="text-gray-300 font-light italic" style={ManropeFontStyle}>Scroll Down To Get Started</p>
          </div>

        </div>

      </div>


      <div className="black-res-portion1">


        <div className="pt-6 pb-6 pl-3 pr-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>


          {/* <div className="bg-white rounded-lg p-20" style={{ width: '95%', height: '95%' }}>
            <p>hello</p>


          </div> */}

          <div className="bg-white rounded-lg lg:p-28 flex flex-col md:flex-row" style={{ width: '95%', height: '95%', display: 'flex' }}>
            <div style={{ flex: 1, marginRight: '20px', marginTop: '40px', textAlign: 'left' }}>

              {/* <p className="font-semibold text-8xl" style={ManropeFontStyle}>How Does UW Sync Work?</p> */}
              <p className="font-medium text-xl text-black line-clamp-none" style={{ ...ManropeFontStyle, lineHeight: '1.3', display: 'flex', alignItems: 'center' }}>
                <HelpCircle />&nbsp;How Does UW Sync Work?
              </p>


            </div>

            <div className="responsive-div1">

              <p ref={sectionRef} className={`font-semibold sm:text-3xl md:text-2xl lg:text-5xl text-2xl ${isVisible ? 'animated-text2' : ''}`} style={{ ...ManropeFontStyle, lineHeight: '1.3' }}>It's As Easy As 1, 2, 3...<br />

              <span className="mt-10 sm:text-xl md:text-2xl lg:text-3xl text-xl font-normal text-gray-600" style={{ display: 'block', lineHeight: '1' }}>1. Search for your exams</span><br />

              <span className="sm:text-xl md:text-2xl lg:text-3xl text-xl font-normal text-gray-600" style={{ display: 'block', lineHeight: '1' }}>2. Add to your Sync Planner</span><br />

              <span className="sm:text-xl md:text-2xl lg:text-3xl text-xl font-normal text-gray-600" style={{ display: 'block', lineHeight: '1.2' }}>3. Export your Sync Planner to your personal calendar</span>
                            
              </p>

            
            <div className="pt-12">
              <a href="/syncplanner">
                <button className={`outline outline-2 outline-black bg-black rounded-full text-white font-medium p-3 hover:outline-2 hover:outline-black hover:outline hover:bg-white hover:text-black`} style={ManropeFontStyle}>
                  Get Started
                </button>
              </a>
            </div>

            </div>

          </div>



        </div>



      </div>

      <Footer />

    </>
  );
}
