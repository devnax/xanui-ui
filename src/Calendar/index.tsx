"use client";
import { useEffect, useRef, useState } from "react";
import Stack from "../Stack";
import IconButton from "../IconButton";
import IconKeyboardArrowRight from "@xanui/icons/KeyboardArrowRight";
import IconKeyboardArrowLeft from "@xanui/icons/KeyboardArrowLeft";
import Text from "../Text";
import Button from "../Button";
import ResetIcon from "@xanui/icons/Replay";
import ViewBox from "../ViewBox";
import {
  UseColorTemplateColor,
  useThemeComponent,
  useBreakpointPropsType,
  useBreakpointProps,
} from "@xanui/core";
import Scrollbar from "../Scrollbar";

export type CalendarProps = {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  viewMode?: useBreakpointPropsType<"year" | "month" | "day">;
  onButtonClick?: (
    mode: CalendarProps["viewMode"],
    value: CalendarProps["value"],
  ) => void;
  color?: useBreakpointPropsType<UseColorTemplateColor>;
};

const ShowYears = ({ color, year, today, onClick }: any) => {
  let years: any[] = [];
  const selectedRef: any = useRef(null);
  for (let y = 1900; y < today.getFullYear() + 40; y++) {
    const selected = year == y;
    years.push(
      <Stack
        key={y}
        sx={{
          width: 50,
          p: 0.1,
        }}
        className="calender-year-item"
      >
        <Button
          color={selected ? color : "default"}
          className="calender-year-button"
          size="xs"
          ref={selected ? selectedRef : null}
          onClick={() => onClick(y)}
          variant={selected ? "fill" : "text"}
        >
          {y}
        </Button>
      </Stack>,
    );
  }

  useEffect(() => {
    if (selectedRef?.current) {
      selectedRef?.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, []);

  return (
    <Scrollbar
      className="calender-years"
      size={0}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        overflow: "hidden",
        overflowY: "auto",
        height: 250,
      }}
    >
      {years}
    </Scrollbar>
  );
};

const Calendar = ({ value, ...rest }: CalendarProps) => {
  let [{ onChange, viewMode: VMode, onButtonClick, color }] =
    useThemeComponent<any>("Calender", rest, {});
  const _p: any = {};
  if (VMode) _p.VMode = VMode;
  if (color) _p.color = color;
  const p: any = useBreakpointProps(_p);
  color = p.color || "brand";

  let [viewMode, setViewMode] = useState<any>(p.VMode || "day");
  let [selectedDate, setSelectedDate] = useState(new Date());
  selectedDate = value instanceof Date ? value : selectedDate;
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();
  const today = new Date();
  const btnWidth = 32;
  const boxWidth = btnWidth * 7;

  const showCalendar = () => {
    let firstDay = new Date(year, month).getDay();
    let rows = [];
    let row = [];

    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
    for (let i = 0; i < dayNames.length; i++) {
      const k = dayNames[i];
      row.push(
        <IconButton
          key={"dayname-" + i}
          variant={"text"}
          size={"xs"}
          color="default"
          disabled
          sx={{
            width: btnWidth,
            height: btnWidth,
            justifyContent: "center",
          }}
        >
          {k}
        </IconButton>,
      );
    }

    rows.push(
      <Stack flexRow key={"header"} className="calender-day-row">
        {row}
      </Stack>,
    );

    let date = 1;
    for (let i = 0; i < 6; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          row.push(
            <Stack
              alignItems="center"
              justifyContent="center"
              key={date + j + i}
              sx={{
                width: btnWidth,
                height: btnWidth,
              }}
            ></Stack>,
          );
        } else if (date > daysInMonth) {
          break;
        } else {
          let isToday =
            date === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth();
          let isSelected =
            date === selectedDate.getDate() &&
            year === selectedDate.getFullYear() &&
            month === selectedDate.getMonth();

          let css: any = {
            color: "default",
            variant: "text",
          };
          if (isToday) {
            css = {
              variant: "outline",
              color: "brand",
            };
          }

          if (isSelected) {
            css = {
              variant: "fill",
              color: color,
            };
          }

          row.push(
            <IconButton
              key={`date_${date}`}
              sx={{
                width: btnWidth,
                height: btnWidth,
                justifyContent: "center",
              }}
              className="calender-day-button"
              size={"xs"}
              {...css}
              data-value={date}
              onClick={(e: any) => {
                let d = e.target.getAttribute("data-value");
                if (!d) return;
                let selectedDate = new Date(year, month, parseInt(d));
                onChange
                  ? onChange(selectedDate)
                  : setSelectedDate(selectedDate);
                onButtonClick && onButtonClick("day", selectedDate);
              }}
            >
              {date}
            </IconButton>,
          );
          date++;
        }
      }
      rows.push(
        <Stack flexRow key={"row" + i} className="calender-day-row">
          {row}
        </Stack>,
      );
    }
    return rows;
  };

  const showMonth = () => {
    let months: any[] = [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let m = 0; m < monthNames.length; m++) {
      const selected = currentDate.getMonth() === m;

      months.push(
        <Stack
          key={m}
          width={"50%"}
          alignItems="center"
          justifyContent="center"
          className="calender-months-item"
        >
          <Button
            color={selected ? color : "default"}
            className="calender-month-button"
            size="xs"
            variant={selected ? "fill" : "text"}
            onClick={() => {
              const v = new Date(currentDate.getFullYear(), m);
              setCurrentDate(v);
              setViewMode("day");
              onButtonClick && onButtonClick("month", v);
            }}
          >
            {monthNames[m]}
          </Button>
        </Stack>,
      );
    }

    return (
      <Stack
        className="calender-months"
        sx={{
          flexWrap: "wrap",
          overflow: "hidden",
          overflowY: "auto",
          flexDirection: "row",
          height: 250,
        }}
      >
        {months}
      </Stack>
    );
  };

  let view: any = null;
  switch (viewMode) {
    case "year":
      view = (
        <ShowYears
          color={color}
          today={today}
          year={year}
          onClick={(y: any) => {
            currentDate.setFullYear(y);
            setCurrentDate(currentDate);
            setViewMode("month");
            onButtonClick && onButtonClick("year", currentDate);
          }}
        />
      );
      break;
    case "month":
      view = showMonth();
      break;
    default:
      view = <>{showCalendar()}</>;
      break;
  }

  return (
    <ViewBox
      className="calender-root"
      width={boxWidth + 16}
      radius={1}
      bgcolor="surface.primary"
      startContent={
        <Stack
          className="calender-header"
          flexRow
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <Text
            fontWeight="bold"
            cursor="pointer"
            onClick={() => setViewMode(viewMode !== "day" ? "day" : "year")}
            flex={1}
          >
            {currentDate.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
            })}
          </Text>
          <IconButton
            color="default"
            variant="text"
            size={"sm"}
            onClick={() => {
              setCurrentDate(new Date());
              onChange ? onChange(new Date()) : setSelectedDate(new Date());
            }}
          >
            <ResetIcon fontSize={20} />
          </IconButton>
          <IconButton
            color="default"
            variant="text"
            size={"sm"}
            onClick={() => {
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 1,
                  1,
                ),
              );
            }}
          >
            <IconKeyboardArrowLeft />
          </IconButton>
          <IconButton
            color="default"
            variant="text"
            size={"sm"}
            onClick={() => {
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1,
                ),
              );
            }}
          >
            <IconKeyboardArrowRight />
          </IconButton>
        </Stack>
      }
    >
      <Stack p={1} height="100%" className="calender-container">
        {view}
      </Stack>
    </ViewBox>
  );
};

export default Calendar;
