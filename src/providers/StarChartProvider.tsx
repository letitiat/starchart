import { createContext, ReactNode, useEffect, useState } from "react"
import { DayState, HistoryStatus, IStarChartContent, ITask, ITaskHistory } from "../types/types";
import dayjs from "../utils/dayjs";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const INITIAL__TASKS: IStarChartContent['tasks'] = [
  {
    taskName: 'Gym',
    taskId: '1',
    days: ["unfilled", "disabled", "filled", "filled", "unfilled", "filled", "unfilled"],
  },
  {
    taskName: 'Food',
    taskId: '2',
    days: ["unfilled", "filled", "filled", "filled", "disabled", "filled", "filled"]
  }
]

const getHistoryStatus = (status: DayState): HistoryStatus => {
  switch (status) {
    case 'disabled':
      return status;
    case 'unfilled':
      return 'failed';
    default:
      return 'completed'
  }
}

export const StarChartContext = createContext<IStarChartContent>({ tasks: INITIAL__TASKS, setTasks: () => { } });

export const StarChartProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useLocalStorageState<ITask[]>('INITIAL_TASKS', INITIAL__TASKS)
  const [lastSeen, setLastSeen] = useLocalStorageState<dayjs.Dayjs>('LAST_SEEN', dayjs())
  const [_, setHistory] = useLocalStorageState<ITaskHistory[]>('TASK_HISTORY');

  useEffect(() => {
    if (lastSeen) {
      const lastSeenWeekStart = dayjs(lastSeen).startOf('week').add(1, 'day');
      const lastSeenWeekEnd = dayjs(lastSeen).endOf('week').add(1, 'day');

      if (dayjs().isAfter(lastSeenWeekEnd)) {
        // it's been over a week, save what we have and get rid of the last
        const daysToMapOver: { date: string }[] = Array.from({ length: 7 }, (_, i) =>
          ({ date: lastSeenWeekStart.add(i, 'day').format('DD/MM/YYYY') }));

        const newHistory: ITaskHistory[] = daysToMapOver.map(({ date }, i) => ({
          date,
          tasks: tasks.map((task) => ({
            task: task.taskName,
            status: getHistoryStatus(task.days[i])
          }))
        }))

        setHistory(newHistory)
        setTasks((prev) => prev.map((task) => ({
          ...task,
          days: task.days.map((status) => (
            status === 'filled' ? 'unfilled' : status
          ))
        })))
        setLastSeen(dayjs())
      }
    }
  }, [])

  return (
    <StarChartContext.Provider value={{ tasks: tasks, setTasks: setTasks }}>
      {children}
    </StarChartContext.Provider>
  )
}