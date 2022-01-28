import React from 'react';
import Calendar from 'react-calendar';
import './styles.scss';

interface ICustomCalendar {
  value?: Date;
  onChange: (v: Date | Array<Date>) => void;
  range?: boolean;
}

function CustomCalendar({ onChange, value, range = false }: ICustomCalendar) {
  return (
    <div>
      <Calendar
        selectRange={range}
        value={value}
        onChange={onChange}
        calendarType="US"
        className="react-calendar"
      />
    </div>
  );
}

export default CustomCalendar;
