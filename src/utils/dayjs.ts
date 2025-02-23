import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export const getCurrentDayOfWeek = () => dayjs().isoWeekday();
export const getStartOfWeek = (day: dayjs.Dayjs) => dayjs(day).isoWeekday(1).startOf('day');
export const getEndOfWeek = (day: dayjs.Dayjs) => dayjs(day).isoWeekday(7).endOf('day');

export default dayjs;
