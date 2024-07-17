"use client"

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

const ManropeFontStyle = {
    fontFamily: 'Manrope, sans-serif',
  };

export default function About() {
    return (

        <>
        <Navbar />
            <div className="section grain relative h-screen overflow-y-hidden about">
                <div className="text-white mt-48 lg:mt-44 lg:pt-24 lg:pl-60 lg:pr-60" style={ManropeFontStyle}>
                    <p className="text-4xl font-bold">About UW Sync</p>
                    <p className="mt-10 text-xl font-semibold">Welcome to UW Sync!</p>
                    <p className="mt-10 font-light text-lg">UW Sync is an exam scheduler for University of Waterloo students. You can use this platform to search for your final exams, add them to the Sync Planner, then export all the dates (at the same time!) directly to your personal calendar.</p>
                    <p className="mt-10 font-light text-lg">Final exam season is already so jam-packed, and manually scheduling exams in your calendar is a waste of time. UW Sync performs this task within seconds; saving you time to do other meaningful tasks.</p>
                </div>
            </div>
        <Footer />
        </>

    );
};