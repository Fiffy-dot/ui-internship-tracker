import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './style.css';

const DatePickerComponent = ({onChange}) => {
  const [startDate, setStartDate] = useState(new Date());
  const handleDateChaneS = (date) => {
    setStartDate(date);
    const day = date.getDate();
    const validDay = String(day).lenght === 1 ? `0${day}` : day;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const validMonth = String(month).length === 1 ? `0${month}` : month;
    const newDateFormat = `${year}-${validMonth}-${validDay}`
    const e = {
      target : {
        name: "dueDate",
        value: newDateFormat
      }
    }
    onChange(e);
  }
  return (
    <DatePicker selected={startDate} onChange={(date) => handleDateChaneS(date)} />
  );
};

export default DatePickerComponent;
