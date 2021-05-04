//import { EventData } from './EventData';

import dayjs from "dayjs";
import { EventType } from "./CalendarContext";

export const ServerAccess = () => {
    const events = [
        { id: 1, name: "ミーティング", startDate: "2021-01-01", endDate: "2021-01-01", color: "blue" },
        { id: 2, name: "イベント", startDate: "2021-01-02", endDate: "2021-01-03", color: "limegreen" },
        { id: 3, name: "会議", startDate: "2021-01-06", endDate: "2021-01-06", color: "deepskyblue" },
        { id: 4, name: "有給", startDate: "2021-01-08", endDate: "2021-01-08", color: "dimgray" },
        { id: 5, name: "海外旅行", startDate: "2021-01-08", endDate: "2021-01-11", color: "navy" },
        { id: 6, name: "誕生日", startDate: "2021-01-16", endDate: "2021-01-16", color: "orange" },
        { id: 7, name: "イベント", startDate: "2021-01-12", endDate: "2021-01-15", color: "limegreen" },
        { id: 8, name: "出張", startDate: "2021-01-12", endDate: "2021-01-13", color: "teal" },
        { id: 9, name: "客先訪問", startDate: "2021-01-14", endDate: "2021-01-14", color: "red" },
        { id: 10, name: "パーティ", startDate: "2021-01-15", endDate: "2021-01-15", color: "royalblue" },
        { id: 12, name: "ミーティング", startDate: "2021-01-18", endDate: "2021-01-19", color: "blue" },
        { id: 13, name: "イベント", startDate: "2021-01-21", endDate: "2021-01-21", color: "limegreen" },
        { id: 14, name: "有給", startDate: "2021-01-20", endDate: "2021-01-20", color: "dimgray" },
        { id: 15, name: "イベント", startDate: "2021-01-25", endDate: "2021-01-28", color: "limegreen" },
        { id: 16, name: "会議", startDate: "2021-01-21", endDate: "2021-01-21", color: "deepskyblue" },
        { id: 17, name: "旅行", startDate: "2021-01-23", endDate: "2021-01-24", color: "navy" },
        { id: 18, name: "ミーティング", startDate: "2021-01-28", endDate: "2021-01-28", color: "blue" },
        { id: 19, name: "会議", startDate: "2021-01-12", endDate: "2021-01-12", color: "deepskyblue" },
        { id: 20, name: "誕生日", startDate: "2021-01-30", endDate: "2021-01-30", color: "orange" },
    ];

    const result: EventType[] = [];

    events.forEach(event => {
        result.push({ id: event.id, name: event.name, startDate: dayjs(event.startDate), endDate: dayjs(event.endDate), color: event.color });
    })

    return result;
}