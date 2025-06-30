import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";

const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const getStartDayOffset = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  return firstDay === 0 ? 6 : firstDay - 1; // Monday as first
};

export const Calendar = () => {
  const today = new Date();
  const [selected, setSelected] = useState(null);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const days = getDaysInMonth(year, month);
  const offset = getStartDayOffset(year, month);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const handleSelect = (date) => {
    setSelected(date.toDateString());
  };

  const weeks = [];
  const allCells = [...Array(offset).fill(null), ...days];
  for (let i = 0; i < allCells.length; i += 7) {
    weeks.push(allCells.slice(i, i + 7));
  }

  return (
    <div
      className="p-3 border rounded shadow-sm"
      style={{ maxWidth: 360, fontSize: "0.875rem" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={prevMonth}
          style={{ width: 32, height: 32, padding: 0 }}
        >
          ‹
        </Button>
        <div className="fw-semibold text-center">
          {new Date(year, month).toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </div>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={nextMonth}
          style={{ width: 32, height: 32, padding: 0 }}
        >
          ›
        </Button>
      </div>

      <Table bordered responsive className="text-center mb-0">
        <thead>
          <tr className="bg-light text-muted small">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <th key={day} className="p-1">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, idx) => (
            <tr key={idx}>
              {week.map((day, i) => {
                const isToday =
                  day &&
                  day.toDateString() === new Date().toDateString();

                return (
                  <td key={i} className="p-1">
                    {day ? (
                      <Button
                        variant={
                          selected === day.toDateString()
                            ? "primary"
                            : isToday
                            ? "light"
                            : "outline-secondary"
                        }
                        size="sm"
                        style={{
                          width: "2rem",
                          height: "2rem",
                          padding: 0,
                          fontSize: "0.75rem",
                          borderRadius: "0.375rem",
                          fontWeight: 400,
                          backgroundColor:
                            isToday && selected !== day.toDateString()
                              ? "#f0f0f0"
                              : undefined,
                          color: isToday && !selected ? "#212529" : undefined,
                        }}
                        onClick={() => handleSelect(day)}
                      >
                        {day.getDate()}
                      </Button>
                    ) : (
                      <span className="text-muted"> </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>

      {selected && (
        <div className="mt-2 text-center small text-muted">
          Selected: <strong>{selected}</strong>
        </div>
      )}
    </div>
  );
};
