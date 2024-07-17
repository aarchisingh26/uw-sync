"use client"

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

const ManropeFontStyle = {
    fontFamily: 'Manrope, sans-serif',
  };

export default function TermsAndPrivacy() {
    return (

        <>
        <Navbar />
            <div className="section grain relative h-96 overflow-y-hidden terms">
                <div className="text-white mt-48 lg:mt-44 lg:pt-24 lg:pl-60 lg:pr-60" style={ManropeFontStyle}>
                    <p className="text-4xl font-bold">Privacy & Terms</p>

                    <p className="mt-10 text-sm font-normal text-gray-300">Last updated: February 29, 2024</p>

                    <p className="mt-10 font-normal text-lg">Have any additional questions or concerns? Contact us at&nbsp; 
                    <a href="mailto:uwsync.com@gmail.com" className="text-blue-500 underline underline-offset-2">uwsync.com@gmail.com</a>
                    &nbsp;or the contact form on this site.</p>

                    <p className="mt-10 text-xl font-semibold">Disclaimer</p>
                    <p className="mt-10 font-light text-lg">UW Sync makes no warranties or representations about the accuracy or completeness of the content on uwsync.com. Users must exercise due diligence and double check their exam dates, times, etc. UW Sync does not and will not be liable for any indirect, incidental, special, consequential, or punitive damages (i.e. user missing an exam because they did not double check their exam's details) arising out of or related to the use of uwsync.com.</p>

                    <p className="mt-10 text-xl font-semibold">Intellectual Property</p>
                    <p className="mt-10 font-light text-lg pl-8">i) The design and logos on uwsync.com are the property of UW Sync. Users may not reproduce, distribute, or display any portion of the site without prior written consent.</p>
                    <p className="mt-10 font-light text-lg pl-8">ii) The exam data belongs to the University of Waterloo. UW Sync has no ownership over the data and has no intention of reproducing the data - we simply display it in a different format.</p>

                    <p className="mt-10 text-xl font-semibold">Calendar Downloads</p>
                    <p className="mt-10 font-light text-lg">When you export your calendar, a standard ICS (iCalendar) File will be downloaded to your system. We do not store any personal information when you download this file.</p>

                    <p className="mt-10 text-xl font-semibold">Session Persistence</p>
                    <p className="mt-10 font-light text-lg">Although UW Sync does not use cookies, we do use session persistence for the Sync Planner. Session persistence is used to maintain information on the page during refreshes/closing the site's tab. This ensures that the user's selected exams remain stored temporarily, allowing for a seamless and uninterrupted interaction with our services. Session persistence is not the same thing as cookies, and it does not access any of the user's personal information/data.</p>


                    <p className="mt-10 text-xl font-semibold">Third Party Services</p>
                    <p className="mt-10 font-light text-lg">UW Sync uses many external libraries, that do not process nor store your personal information.</p>

                    <p className="mt-10 text-xl font-semibold">Third Party Links</p>
                    <p className="mt-10 font-light text-lg">Our site contains links to third-party websites. We are not responsible for the privacy practices or content of these websites. Please review their privacy policies.</p>

                    <p className="mt-10 text-xl font-semibold">Changes To Terms</p>
                    <p className="mt-10 font-light text-lg">UW Sync reserves the right to modify these Terms at any time. The date of the last update will be displayed at the beginning of this page.</p>


                    <p className="mt-10 text-xl font-semibold">Consent</p>
                    <p className="mt-10 mb-10 font-light text-lg">By using our website (uwsync.com), you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>

                </div>
            </div>
        <Footer />
        </>

    );
};