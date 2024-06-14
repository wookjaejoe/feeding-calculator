import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import './ScrollPicker.css';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const dates = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 10 }, (_, i) => 2014 + i);

const ScrollPicker = () => {
  const [selectedMonth, setSelectedMonth] = useState('July');
  const [selectedDate, setSelectedDate] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2017);

  const monthRef = useRef(null);
  const dateRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    scrollToItem(monthRef, months.indexOf(selectedMonth));
  }, [selectedMonth]);

  useEffect(() => {
    scrollToItem(dateRef, dates.indexOf(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    scrollToItem(yearRef, years.indexOf(selectedYear));
  }, [selectedYear]);

  const scrollToItem = (ref, index) => {
    if (ref.current) {
      ref.current.scrollTo({
        top: index * 40,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = (e, type) => {
    const index = Math.round(e.target.scrollTop / 40);
    if (type === 'month') {
      setSelectedMonth(months[index]);
    } else if (type === 'date') {
      setSelectedDate(dates[index]);
    } else {
      setSelectedYear(years[index]);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="scroll-container" ref={monthRef} onScroll={(e) => handleScroll(e, 'month')}>
        {months.map((month) => (
          <div key={month} className={`scroll-item ${selectedMonth === month ? 'selected' : ''}`}>
            {month}
          </div>
        ))}
      </div>
      <div className="scroll-container" ref={dateRef} onScroll={(e) => handleScroll(e, 'date')}>
        {dates.map((date) => (
          <div key={date} className={`scroll-item ${selectedDate === date ? 'selected' : ''}`}>
            {date}
          </div>
        ))}
      </div>
      <div className="scroll-container" ref={yearRef} onScroll={(e) => handleScroll(e, 'year')}>
        {years.map((year) => (
          <div key={year} className={`scroll-item ${selectedYear === year ? 'selected' : ''}`}>
            {year}
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ScrollPicker;