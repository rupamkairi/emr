import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DatePickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  mode?: "single" | "range";
  triggerClassName?: string;
  calendarClassName?: string;
}

export function DatePicker({
  mode,
  triggerClassName,
  calendarClassName,
  placeholder,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();
  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-96 justify-start text-left font-normal",
            !date && "text-muted-foreground",
            triggerClassName
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {mode === "single" && date && format(date, "PPP")}
          {mode === "range" &&
            dateRange &&
            format(dateRange.from, "PPP") + " - " + format(dateRange.to, "PPP")}
          {/* <span>{placeholder}</span> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          className={calendarClassName}
          mode={mode}
          selected={
            mode === "single" ? date : mode === "range" ? dateRange : date
          }
          onSelect={(value) => {
            if (mode === "single") {
              setDate(date);
            } else if (mode === "range") {
              setDateRange(value);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
