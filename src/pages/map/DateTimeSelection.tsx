
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

interface DurationOption {
  value: number;
  label: string;
}

interface DateTimeSelectionProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  duration: number;
  setDuration: (duration: number) => void;
  durationOptions: DurationOption[];
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ 
  date, 
  setDate, 
  startTime, 
  setStartTime, 
  duration, 
  setDuration,
  durationOptions
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "dd-MM-yyyy") : "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Start Time</label>
        <select
          className="w-full rounded-md border border-input bg-transparent px-3 py-2"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        >
          {Array.from({ length: 24 }).map((_, i) => {
            const hour = i % 12 === 0 ? 12 : i % 12;
            const period = i < 12 ? 'AM' : 'PM';
            const timeString = `${hour}:00 ${period}`;
            return (
              <option key={i} value={timeString}>
                {timeString}
              </option>
            );
          })}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Duration</label>
        <div className="grid grid-cols-4 gap-2">
          {durationOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={duration === option.value ? "default" : "outline"}
              className={duration === option.value ? "bg-blue-600" : ""}
              onClick={() => setDuration(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelection;
