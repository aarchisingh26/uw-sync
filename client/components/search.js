"use client"

import React, { useState, useEffect } from "react";
import ICAL from "ical.js";

export default function SearchExams() {

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
        const response = await fetch(`http://localhost:5002/exams/?courseName=${course}`);
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

//--------------------------------------------------------------------------

  //good!
  // const [course, setCourse] = useState("");
  // const [exams, setExams] = useState([]);
  // const [planner, setPlanner] = useState([]);

  // useEffect(() => {
  //   const storedCalendar = localStorage.getItem('calendar');
  //   if (storedCalendar) {
  //     try {
  //       const parsedCalendar = JSON.parse(storedCalendar);
  //       setPlanner(parsedCalendar);
  //     } catch (error) {
  //       console.error("Error parsing calendar data from local storage:", error);
  //     }
  //   }
  // }, []);


  // const onSubmitForm = async(e) => {
  //   e.preventDefault();

  //   if (course || course.trim()) {
  //     try {
  //       const response = await fetch(`http://localhost:5002/exams/?courseName=${course}`);

  //       const parseResponse = await response.json();

  //       setExams(parseResponse);

  //       // console.log(parseResponse);

  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   } else {
  //     console.log("Please enter a valid course name");
  //     setExams([]);
  //   }
  // }

//good!!!
  // const addToPlanner = async (exam) => {
  //   setPlanner((prevPlanner) => [...prevPlanner, exam]);
  //   localStorage.setItem('calendar', JSON.stringify([...planner, exam]));
  // }; 
  // const handleRemoveExam = (examKey) => {
  //   const updatedExams = planner.filter((exam) => exam.exam_id !== examKey);
  //   setPlanner(updatedExams);
  //   localStorage.setItem('calendar', JSON.stringify(updatedExams));
  // };

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


  //future: add direct link to google calendar export

  return (
    <>
      <div className="ml-80 mt-20">
        <p>course</p>
        <form onSubmit={onSubmitForm}>
          <input 
            type="text"
            name="name"
            placeholder="Enter course..."
            value={course}
            onChange={e => setCourse(e.target.value)}
            
          />
          <button className="bg-red-500">submit</button>
        </form>

        <table>
          <thead>
            <tr>
              <th className="p-7">course</th>
              <th className="p-7">section</th>
              <th className="p-7">day</th>
              <th className="p-7">date</th>
              <th className="p-7">exam start</th>
              <th className="p-7">exam end</th>
              <th className="p-7">location</th>

              <th className="p-7"></th>
            </tr>
          </thead>
          <tbody>
            {exams.length === 0 ? (
              <tr>
                <td colSpan="7">No results to display.</td>
              </tr>
            ) : (
              exams.map(exam => (
                <tr key={exam.exam_id}>
                  <td className="p-7">{exam.course}</td>
                  <td className="p-7">{exam.section}</td>
                  <td className="p-7">{exam.day}</td>
                  <td className="p-7">{exam.date}</td>
                  <td className="p-7">{exam.exam_start}</td>
                  <td className="p-7">{exam.exam_end}</td>
                  <td className="p-7">{exam.location}</td>

                  {/* replace addToPlanner function with function that will add to planner */}
                  {/* <td className="p-7">
                    <button onClick={() => addToPlanner(exam)}>
                      Add to Sync Planner
                    </button>
                  </td> */}

                  <td className="p-7">
                    {addedExams.includes(exam.exam_id) ? (
                      "Added"
                    ) : (
                      <button onClick={() => addToPlanner(exam)}>
                        Add to Sync Planner
                      </button>
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>


        {/* Planner Table */}
      <h2>Planner</h2>

      
      <table>
        <thead>
          <tr>
          <th className="p-7">course</th>
              <th className="p-7">section</th>
              <th className="p-7">day</th>
              <th className="p-7">date</th>
              <th className="p-7">exam start</th>
              <th className="p-7">exam end</th>
              <th className="p-7">location</th>

              <th className="p-7">remove</th>
          </tr>
        </thead>
       
      {/* {planner && ( */}
        <tbody>
          {planner.map((plannerExam) => (
            <tr key={plannerExam.exam_id}>
              <td className="p-7">{plannerExam.course}</td>
              <td className="p-7">{plannerExam.section}</td>
              <td className="p-7">{plannerExam.day}</td>
              <td className="p-7">{plannerExam.date}</td>
              <td className="p-7">{plannerExam.exam_start}</td>
              <td className="p-7">{plannerExam.exam_end}</td>
              <td className="p-7">{plannerExam.location}</td>

              <td className="p-7">
                <button onClick={() => handleRemoveExam(plannerExam.exam_id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      {/* )} */}
        
      </table>

       <button onClick={exportCalendar}>
        Export to Calendar
      </button>




      </div>

    </>
  );
}
