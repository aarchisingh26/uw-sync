"use client"

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import React, { useState, useEffect } from "react";

const ManropeFontStyle = {
    fontFamily: 'Manrope, sans-serif',
  };

export default function SyncPlanner() {

    const [course, setCourse] = useState("");
    const [exams, setExams] = useState([]);
    const [planner, setPlanner] = useState([]);
    const [addedExams, setAddedExams] = useState([]);

    useEffect(() => {
        const storedCalendar = localStorage.getItem('calendar');
        if (storedCalendar) {
        try {
            const parsedCalendar = JSON.parse(storedCalendar);
            setPlanner(parsedCalendar);
            setAddedExams(parsedCalendar.map((exam) => exam.exam_id));
        } catch (error) {
            console.error("Error parsing calendar data from local storage:", error);
        }
        }
    }, []);

    const onSubmitForm = async (e) => {
        e.preventDefault();

        if (course.trim()) {
        try {
            // const response = await fetch(`http://localhost:5002/exams/?courseName=${course}`);
            const response = await fetch(`https://uw-sync-backend.vercel.app/exams/?courseName=${course}`);
            const parseResponse = await response.json();

            //flag indicating whether each exam is already in the planner
            const updatedExams = parseResponse.map((exam) => {
            if (addedExams.includes(exam.exam_id)) {
                return { ...exam, added: true };
            }
            return exam;
            });

            setExams(updatedExams);
        } catch (err) {
            console.error(err.message);
        }
        } else {
        console.log("Please enter a valid course name");
        setExams([]);
        }
    };

    const addToPlanner = (exam) => {
        setPlanner((prevPlanner) => [...prevPlanner, exam]);
        setAddedExams((prevAddedExams) => [...prevAddedExams, exam.exam_id]);
        localStorage.setItem('calendar', JSON.stringify([...planner, exam]));
    };

    const handleRemoveExam = (examKey) => {
        const updatedExams = planner.filter((exam) => exam.exam_id !== examKey);
        setPlanner(updatedExams);
        setAddedExams((prevAddedExams) => prevAddedExams.filter((id) => id !== examKey));
        localStorage.setItem('calendar', JSON.stringify(updatedExams));
    };

    function formatDateTime(date, timeString) { 

        // Convert date to YYYYMMDD format
        const formattedDate = new Date(date).toISOString().slice(0, 10).replace(/-/g, '');
    
    
        const match = timeString.match(/(\d+):(\d+) (\w+)/); 
        const hour = parseInt(match[1]); 
        const minute = match[2]; 
        const period = match[3]; 
        let formattedHour = hour; 
      
        if (period === 'PM' && hour < 12) { 
            formattedHour += 12; 
        } 
      
        return `${formattedDate}T${formattedHour}${minute}00`; 
      } 
        
    
      const exportCalendar = () => {
    
        const calendarContent = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'CALSCALE:GREGORIAN',
          ...planner.map((exam) => {
            const uniqueId = `${exam.course}-${exam.section}-${exam.exam_start.replace(/\s/g, '_')}`;
            return [
              'BEGIN:VEVENT',
              `SUMMARY:${exam.course} FINAL EXAM`,
              `DESCRIPTION:Building: ${exam.location} -> ***IMPORTANT NOTE: Please check Odyssey for your designated seat!`,
              `DTSTART:${formatDateTime(exam.date, exam.exam_start)}`,
              `DTEND:${formatDateTime(exam.date, exam.exam_end)}`,
              `LOCATION: ${exam.location.replace(/,/g, '\\,')}`,
              'STATUS:CONFIRMED',
              'SEQUENCE:0',
              'BEGIN:VALARM',
              'TRIGGER:-PT15M',
              'DESCRIPTION:Reminder',
              'ACTION:DISPLAY',
              'END:VALARM',
              'UID:' + uniqueId,
              'END:VEVENT',
            ].join('\n');
          }),
          'END:VCALENDAR',
        ].join('\n');
    
        const icsDataBlob = new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' });
        const icsDataURL = URL.createObjectURL(icsDataBlob);
    
        const a = document.createElement('a');
        a.href = icsDataURL;
        a.download = 'winter24_final_exams.ics';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };


return (

    <>
    <Navbar />
    <div className="section grain relative h-screen overflow-y-auto syncplanner">

        <div className="pt-44">
        
        <div className="text-white pb-8 animated-text2" style={ManropeFontStyle}>
            <p className="text-5xl font-bold pb-5">
                Search For Your Exams
            </p>

            <p className="font-normal text-base mt-3" style={{ display: 'block', lineHeight: '1.5' }}>Enter a course code/faculty (i.e. ECE 106, MATH, etc.) into the search bar and then press return/enter or the "Find Exams" button to search. You may search with uppercase and/or lowercase letters.</p>

            <p className="text-base font-normal mt-5" style={{ display: 'block', lineHeight: '1.5' }}>*NOTE: Although this platform has been thorougly tested, you must still practice due diligence to double-check your exam dates/times/seating on Odyssey. UW Sync does NOT take responsibilty for you missing your exam.
            For more info, please read our&nbsp;
            <a href="/privacy" className="text-blue-500 underline underline-offset-2">Privacy & Terms</a>
            </p>
            
        </div>

        <form onSubmit={onSubmitForm} className="animated-text2 flex items-center">
          <input 
            type="text"
            name="name"
            placeholder="Enter course..."
            value={course}
            onChange={e => setCourse(e.target.value)}
            style={{...ManropeFontStyle, width: '500px' }}
            className="pt-3 pb-3 pl-5 pr-5 rounded-full outline-none"
          />
          <div className="pl-6">
            <button className="pl-5 pr-5 pt-3 pb-3 submitBtn text-white rounded-full" style={ManropeFontStyle}>
                Find Exams
            </button>
            {/* add see find a problem? contact us button */}
          </div>
        </form>

<div className="pt-5">
    <div className="overflow-x-auto h-screen overflow-y-visible" style={ManropeFontStyle}>
        <table className="text-white table-auto w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-8 whitespace-nowrap">Course</th>
              <th className="p-8 whitespace-nowrap">Section(s)</th>
              <th className="p-8 whitespace-nowrap">Day</th>
              <th className="p-8 whitespace-nowrap">Date</th>
              <th className="p-8 whitespace-nowrap">Exam Start</th>
              <th className="p-8 whitespace-nowrap">Exam End</th>
              <th className="p-8">Location</th>

              <th className="p-8 pl-3"></th>
            </tr>
          </thead>

          <tbody>
            {exams.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8">No results to display.</td>
              </tr>
            ) : (
              exams.map(exam => (
                <tr key={exam.exam_id} className="text-left border-b animated-text2">
                  <td className="p-8 whitespace-nowrap">{exam.course}</td>
                  <td className="p-8 whitespace-nowrap">{exam.section}</td>
                  <td className="p-8 whitespace-nowrap">{exam.day}</td>
                  <td className="p-8 whitespace-nowrap">{exam.date}</td>
                  <td className="p-8 whitespace-nowrap">{exam.exam_start}</td>
                  <td className="p-8 whitespace-nowrap">{exam.exam_end}</td>
                  <td className="p-8">{exam.location}</td>

                  <td className="">
                    {addedExams.includes(exam.exam_id) ? (
                      "Added"
                    ) : (
                      <button onClick={() => addToPlanner(exam)}>
                        Add
                      </button>
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
    </div>
</div>
      
      
      
      </div>

            
    </div>


    <div className="bg-black relative h-screen overflow-y-hidden">


        <div className="pt-20 pb-20 pl-3 pr-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>


          <div className="bg-white rounded-lg pt-20 pb-20 sm:pl-20 sm:pr-20 pl-5 pr-5" style={{ width: '95%', height: '95%' }}>
            
          <div className="pb-10 pl-8 pr-20 sm:pr-10 sm:pl-10" style={ManropeFontStyle}>
            <p className="text-5xl font-bold">
                Your Sync Planner
            </p>
          </div>

          <div className="pl-8 sm:pt-8 pb-8">
            <button onClick={exportCalendar} className="pl-5 pr-5 pt-3 pb-3 submitBtn text-white rounded-full">
                Export to Calendar
            </button>
        </div>

<div className="overflow-x-auto h-60 sm:h-80 overflow-y-auto" style={ManropeFontStyle}>
        <table className="table-auto w-full">
            <thead>
                <tr className="text-left border-b">
                <th className="p-8 whitespace-nowrap">Course</th>
                    <th className="p-8 whitespace-nowrap">Section(s)</th>
                    <th className="p-8 whitespace-nowrap">Day</th>
                    <th className="p-8 whitespace-nowrap">Date</th>
                    <th className="p-8 whitespace-nowrap">Exam Start</th>
                    <th className="p-8 whitespace-nowrap">Exam End</th>
                    <th className="p-8">Location</th>

                    <th className="p-8 pl-3"></th>
                </tr>
            </thead>
            
            <tbody>
                {planner.map((plannerExam) => (
                <tr key={plannerExam.exam_id} className="text-left border-b">
                    <td className="p-8 whitespace-nowrap">{plannerExam.course}</td>
                    <td className="p-8 whitespace-nowrap">{plannerExam.section}</td>
                    <td className="p-8 whitespace-nowrap">{plannerExam.day}</td>
                    <td className="p-8 whitespace-nowrap">{plannerExam.date}</td>
                    <td className="p-8 whitespace-nowrap">{plannerExam.exam_start}</td>
                    <td className="p-8 whitespace-nowrap">{plannerExam.exam_end}</td>
                    <td className="p-8">{plannerExam.location}</td>

                    <td className="">
                    <button onClick={() => handleRemoveExam(plannerExam.exam_id)}>
                        Remove
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            
        </table>
</div>      
            
        {/* <div className="pl-8 pt-10">
            <button onClick={exportCalendar}>
                Export to Calendar
            </button>
        </div> */}

            </div>
           
          </div>

        </div>

        <Footer />

    </>

    );
}