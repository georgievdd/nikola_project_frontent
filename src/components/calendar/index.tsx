import React, { useEffect, useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import './style.css';
import { api } from '../../api';

interface CalendarProps {
  initialData?: { [key: string]: string };
}

const Calendar = ({ initialData } : CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  useEffect(() => {
    console.log(initialData)
  }, []);
  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>chevron_left</div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const MIN_DATE = new Date(0);
    const MAX_DATE = new Date(8640000000000);
    const minDate = selectedDates.reduce((acc: Date, dat: Date) => (dat < acc ? dat : acc), MAX_DATE)
    const maxDate = selectedDates.reduce((acc: Date, dat: Date) => (dat > acc ? dat : acc), MIN_DATE)
    if (minDate !== MAX_DATE) {
      const minDateDto = minDate.toISOString().split('T')[0].split("-").reverse().join("-")
      const maxDateDto = maxDate.toISOString().split('T')[0].split("-").reverse().join("-")
      api.house.getAll({check_in_date: minDateDto, check_out_date: maxDateDto})
      .catch(() => {})
    }
  }, [selectedDates]);

  const renderDays = () => {
    const dateFormat = "iii";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = new Date(day); // Создаём копию текущего дня
        formattedDate = format(cloneDay, dateFormat);
  
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(cloneDay, monthStart)
                ? "disabled"
                : selectedDates.some(selectedDate => isSameDay(selectedDate, cloneDay)) ? "selected" : ""
            }`}
            key={cloneDay.toISOString()} // Используем копию для ключа
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <div className="bg" style={{ position: 'absolute', fontSize: '10px' }}>
              {initialData && initialData[format(cloneDay, 'dd.MM.yyyy')]}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day.toISOString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day: Date) => {
    if (selectedDates.some(selectedDate => isSameDay(selectedDate, day))) {
      setSelectedDates(selectedDates.filter(selectedDate => !isSameDay(selectedDate, day)));
    } else {
      setSelectedDates([...selectedDates, day]);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
