import * as React from "react";
import { useState, forwardRef, useEffect, useRef } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { NumericFormat } from "react-number-format";

import { Progress } from "./progress";
import { LucideIcon } from "lucide-react";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="flex justify-center">
    <table
      ref={ref}
      className={cn("caption-top text-md", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "[&_tr]:border-b sticky top-0 z-20 bg-white shadow-lg",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  value: string | number;
  onValueChange?: (newValue: string | number) => void;
  editable?: boolean;
  cad?: boolean;
}

// TableCell for editing and formatting
const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      className,
      value,
      onValueChange,
      editable = false,
      cad = false,
      ...props
    },
    ref
  ) => {
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const internalValueRef = useRef(value);

    useEffect(() => {
      internalValueRef.current = value;
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      internalValueRef.current = e.target.value;
    };

    const handleBlur = () => {
      setIsEditing(false);
      if (onValueChange) {
        onValueChange(internalValueRef.current);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleBlur();
      }
    };

    return (
      <td
        ref={ref}
        className={cn(
          "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
          className
        )}
        {...props}
      >
        {isEditing && editable ? (
          <Input
            className="xl:w-[150px]"
            defaultValue={internalValueRef.current}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            ref={inputRef}
          />
        ) : cad ? (
          <NumericFormat
            value={value}
            displayType="text"
            thousandSeparator
            decimalScale={2}
            fixedDecimalScale
            prefix="$"
            onClick={() => editable && setIsEditing(true)}
          />
        ) : (
          <span onClick={() => editable && setIsEditing(true)}>{value}</span>
        )}
      </td>
    );
  }
);

TableCell.displayName = "TableCell";

// TableCell to show progress in a table
interface ProgressCellProps {
  value: number; // Represents the progress value (0 to 100)
  label?: string; // Optional label to show beside the progress
  className?: string;
}

const ProgressCell: React.FC<ProgressCellProps> = ({
  value,
  label,
  className,
}) => {
  return (
    <td
      className={cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
      )}
    >
      <div
        className={`flex items-center justify-center space-x-2 py-2 px-3 ${className}`}
      >
        {label && <span className="text-sm">{label}</span>}
        <Progress value={value} max={100} className="h-2" />
        <span className="text-sm">{value}%</span>
      </div>
    </td>
  );
};

ProgressCell.displayName = "ProgressCell";

interface ImageCellProps {
  icon: LucideIcon;
  className?: string;
  buttonVariant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  handleClick?: () => void;
  iconProps?: string;
}

const ImageCell: React.FC<ImageCellProps> = ({
  icon: Icon,
  className,
  buttonVariant,
  handleClick,
  iconProps,
}) => {
  return (
    <td
      className={cn(
        "p-2 pl-0 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
      )}
    >
      <div
        className={`flex items-center justify-center space-x-2 ${className}`}
      >
        <Button variant={buttonVariant} onClick={handleClick}>
          <Icon className={iconProps} />
        </Button>
      </div>
    </td>
  );
};

ImageCell.displayName = "ImageCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateCellProps {
  value?: string; // format: "YYYY-MM-DD"
  handleValueChange?: (newDate: string) => void;
}

function DateCell({ value, handleValueChange }: DateCellProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    value ? parseISO(value) : undefined
  );

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setOpen(false);
      const formatted = format(selectedDate, "yyyy-MM-dd");
      handleValueChange?.(formatted);
    }
  };

  useEffect(() => {
    if (value) setDate(parseISO(value));
  }, [value]);

  return (
    <td
      className={cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] justify-center border-r pr-6"
      )}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "MM/dd/yyyy") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </td>
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  ProgressCell,
  ImageCell,
  DateCell,
  TableCaption,
};
