"use client"

import React from 'react';
import { Link } from 'lucide-react';

const ManropeFontStyle = {
    fontFamily: 'Manrope, sans-serif',
  };

export default function Footer() {
    return (

        <>
            <footer className="text-white md:px-10 pl-12 pr-5 flex flex-col md:flex-row justify-between bg-black" style={ManropeFontStyle}>
                <div className="pt-6 md:pl-3 md:pt-8 pb-4 md:pb-0">
                    <p>
                        <a href="/" className={`flex items-center hover:text-gray-100 font-bold text-2xl md:text-3xl`} style={ManropeFontStyle}>
                            UW SYNC&nbsp;<Link />
                        </a>
                    </p>

                    <p className="text-sm text-gray-300 mt-1">
                        &copy; 2024 UW Sync. All Rights Reserved.
                    </p>
                </div>
                
                <div className="md:flex space-y-4 md:space-y-0 md:space-x-16 md:pr-8 md:pt-8 pb-10 pt-5 md:pb-10">
                    <div>
                        <p className="text-xl md:text-2xl font-semibold">Contact</p>
                        <p>
                            <a href="mailto:uwsync.com@gmail.com" className="underline underline-offset-2">Email</a>
                        </p>
                    </div>

                    <div>
                        <p className="text-xl md:text-2xl font-semibold">Info</p>
                        <p>
                            <a href="/about" className="underline underline-offset-2">About</a>
                        </p>
                        <p>
                            <a href="/privacy" className="underline underline-offset-2">Privacy & Terms</a>
                        </p>
                    </div>
                </div>
            </footer>


        </>

    );
};