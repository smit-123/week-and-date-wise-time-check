import React, { useState, useEffect } from 'react';

function WeekScheduler({ data }) {
  // State variables for managing the component's data
  const [startDate, setStartDate] = useState(new Date());
  const [schedules, setSchedules] = useState({});
  const [utcOffset, setUtcOffset] = useState(0);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Create an array of dates for the entire week starting from the provided startDate
  const startOfWeek = new Date(startDate);
  startOfWeek.setUTCHours(0, 0, 0, 0);
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setUTCDate(startOfWeek.getUTCDate() + i);
    weekDates.push(date);
  }

  // Create an array of hours adjusted for the provided utcOffset
  const hours = Array.from({ length: 16 }, (_, index) => {
    const hour = 8 + index;
    const adjustedHour = (hour + utcOffset) % 24;
    return `${adjustedHour < 10 ? '0' : ''}${adjustedHour}:00`;
  });

  // useEffect to update schedules when data or startDate changes
  useEffect(() => {
    // Filter the provided data to only include items for the current week
    const currentWeekData = data.filter(item => {
      const date = new Date(item.Date);
      const weekStartDate = new Date(startDate);
      weekStartDate.setUTCHours(0, 0, 0, 0);
      const weekEndDate = new Date(startDate);
      weekEndDate.setUTCDate(startDate.getUTCDate() + 6);
      weekEndDate.setUTCHours(23, 59, 59, 999);
      return date >= weekStartDate && date <= weekEndDate;
    });

    // Initialize the schedules object with the filtered data
    const initialSchedules = {};
    currentWeekData.forEach(item => {
      const date = new Date(item.Date);
      const dayOfWeek = daysOfWeek[date.getUTCDay()];
      if (!initialSchedules[dayOfWeek]) {
        initialSchedules[dayOfWeek] = {};
      }
      const time = item.Time.split(':');
      initialSchedules[dayOfWeek][`${time[0]}:00`] = true;
    });
    setSchedules(initialSchedules);
  }, [data, startDate, daysOfWeek]);

  // Function to handle checkbox changes
  const handleCheckboxChange = (dayOfWeek, time) => {
    const updatedSchedules = { ...schedules };
    updatedSchedules[dayOfWeek][time] = !updatedSchedules[dayOfWeek][time];
    setSchedules(updatedSchedules);
  };

  // Function to render the checkboxes grid
  const renderCheckboxes = () => {
    const checkboxes = [];
    for (let i = 0; i < hours.length; i++) {
      const time = hours[i];
      checkboxes.push(
        <tr key={time}>
          <td>{time}</td>
          {weekDates.map(date => {
            const dayOfWeek = daysOfWeek[date.getUTCDay()];
            return (
              <td key={`${dayOfWeek}-${time}`}>
                <input
                  type="checkbox"
                  checked={schedules[dayOfWeek] && schedules[dayOfWeek][time]}
                  onChange={() => handleCheckboxChange(dayOfWeek, time)}
                />
              </td>
            );
          })}
        </tr>
      );
    }
    return checkboxes;
  };

  // Function to render day schedules table
  const renderDaySchedules = () => {
    return (
      <>
        <table className="checkbox-grid">
          <tbody>
            <tr>
              <th>Time</th>
              {weekDates.map((date, index) => (
                <th key={index}>{daysOfWeek[date.getUTCDay()]}</th>
              ))}
            </tr>
            {renderCheckboxes()}
          </tbody>
        </table>
      </>
    );
  };

  // Function to handle clicking the previous week button
  const handlePreviousWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    setStartDate(newStartDate);
  };

  // Function to handle clicking the next week button
  const handleNextWeek = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);
  };

  return (
    <div>
      <h2>Weekly Schedule</h2>
      {/* Dropdown for selecting UTC offset */}
      <select onChange={(e) => setUtcOffset(e.target.value)}>
        <option value="0">UTC-0</option>
        <option value="5">UTC-5</option>
      </select>
      {/* Buttons for navigating to previous and next weeks */}
      <button onClick={handlePreviousWeek}>Previous Week</button>
      <button onClick={handleNextWeek}>Next Week</button>
      {/* Render the day schedules table */}
      {renderDaySchedules()}
    </div>
  );
}

export default WeekScheduler;
