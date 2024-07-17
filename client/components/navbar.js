"use client"
import React, { useState } from "react";
import { Link } from 'lucide-react';
import { ExternalLink, Menu } from 'lucide-react';

const ManropeFontStyle = {
  fontFamily: 'Manrope, sans-serif',
};

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <div className="p-5 pt-12 pl-12 bg-opacity-0 fixed w-full sm:w-full z-50 flex justify-between items-center">
        <a href="/" className="flex items-center text-gray-100 font-bold text-3xl" style={ManropeFontStyle}>
          UW SYNC&nbsp;<Link />
        </a>
        
        {/* Mobile Dropdown Button */}
        <li className="ml-auto flex space-x-4 pr-7 lg:hidden">
        <button
          onClick={toggleDropdown}
          className="text-4xl text-pink-300 focus:outline-none lg:hidden"
        >
          ⌘
        </button>
        </li>
      </div>

      {/* Dropdown Menu for Mobile */}
      {showDropdown && (
        <div className="lg:hidden fixed top-32 left-0 right-0 mx-auto w-1/2 h-1/2 bg-black text-white p-4 bg-opacity-80 rounded-2xl text-lg z-50">
          <a href="/projects" className="block my-2 hover:text-gray-300" style={ManropeFontStyle}>
            PROJECTS
          </a>
          <a href="/about" className="block my-2 hover:text-gray-300" style={ManropeFontStyle}>
            ABOUT
          </a>
          <a href="/contactme" className="block my-2 hover:text-gray-300" style={ManropeFontStyle}>
            CONTACT ME
          </a>
          <a href="/resume" className="block my-2 hover:text-gray-300" style={ManropeFontStyle}>
            RESUME
          </a>
        </div>
      )}

      {/* Desktop Navbar (hidden on mobile) */}
      <div className="hidden lg:flex justify-end items-center text-white pt-3 pb-3 pl-5 pr-5 bg-black rounded-full bg-opacity-55 fixed z-50 top-10 right-14">
        <ul className="flex space-x-5 text-base">
          <li>
            <a href="/syncplanner" className="flex items-center hover:text-gray-100 font-normal" style={ManropeFontStyle}>
              Sync Planner
            </a>
          </li>
          <li>
            <a href="/about" className="flex items-center hover:text-gray-100 font-normal" style={ManropeFontStyle}>
              About
            </a>
          </li>
          <li>
            <a href="/privacy" className="flex items-center hover:text-gray-100 font-normal" style={ManropeFontStyle}>
              Privacy & Terms
            </a>
          </li>
          <li>
            <a href="/contact" className="flex items-center hover:text-gray-100 font-normal" style={ManropeFontStyle}>
              Contact
            </a>
          </li>
          <li>
            <a href="https://uwaterloo.ca/registrar/final-examinations/exam-schedule" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-100 font-normal" style={ManropeFontStyle}>
              Exam Info&nbsp;<ExternalLink />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
