import { get, isEmpty, isEqual } from "lodash-es";

export const getTodayDateString = () => {
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  return `${date}.${month}.${year}`;
};

export const getSaveLocalData = (data: any) => {
  const todayDateString = getTodayDateString();
  return { date: todayDateString, data };
};

export const extractLocalData = (state: object) => {
  const localDate = get(state, "date", "");
  const localData = get(state, "data", {});
  const todayDateString = getTodayDateString();

  if (!isEqual(localDate, todayDateString) || isEmpty(localData)) {
    return undefined;
  } else {
    return localData;
  }
};
