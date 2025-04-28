import {useEffect, useState} from 'react';

const Clock = () => {

  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  function updateDateTime() {
    const currDate = new Date();
    const timeStr = currDate.toLocaleTimeString([], { hour12: true, second: undefined, hour: 'numeric', minute: '2-digit'});
    const dateStr = currDate.toLocaleDateString([], { month: "long", day: "numeric"});
    setTime(timeStr);
    setDate(dateStr);
  }

  useEffect(() => {
    updateDateTime();
    const updateClockInterval = setInterval(() => {
      updateDateTime();
    }, 1000);

    return () => {
      clearInterval(updateClockInterval);
    }
  }, []);

  return (
    <div className="flex flex-col lg:gap-1 lg:items-end items-start justify-center">
      <span className="lg:text-5xl text-3xl">{time}</span>
      <span className="lg:text-xl">{date}</span>
    </div>
  );
};

export default Clock;