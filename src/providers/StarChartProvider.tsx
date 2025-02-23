import { createContext, ReactNode, useEffect } from "react"
import { IStarChartContent, ITask, ITaskHistory } from "../types/types";
import dayjs, { getEndOfWeek } from "../utils/dayjs";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { taskService } from "../services/taskService";

const INITIAL__TASKS: IStarChartContent['tasks'] = [
  {
    taskName: 'Gym',
    taskId: '1',
    days: ["enabled", "disabled", "selected", "selected", "enabled", "selected", "enabled"],
  },
  {
    taskName: 'Food',
    taskId: '2',
    days: ["enabled", "selected", "selected", "selected", "disabled", "selected", "selected"]
  }
]

export const StarChartContext = createContext<IStarChartContent>({ tasks: INITIAL__TASKS, setTasks: () => { } });

export const StarChartProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useLocalStorageState<ITask[]>('INITIAL_TASKS', INITIAL__TASKS)
  const [lastSeen, setLastSeen] = useLocalStorageState<dayjs.Dayjs>('LAST_SEEN', dayjs())
  const [_, setHistory] = useLocalStorageState<ITaskHistory[]>('TASK_HISTORY');

  useEffect(() => {
    if (lastSeen) {
      const lastSeenWeekEnd = getEndOfWeek(lastSeen);

      if (dayjs().isAfter(lastSeenWeekEnd)) {
        // it's been over a week, save what we have and get rid of the last
        const newHistory = taskService.generateTaskHistory(lastSeen, tasks);
        
        setHistory(newHistory)
        setTasks((prev) => taskService.toggleTaskDaysToUncheckedState(prev))
      }
      setLastSeen(dayjs())
    }
  }, []) // do we want dependencies?

  return (
    <StarChartContext.Provider value={{ tasks: tasks, setTasks: setTasks }}>
      {children}
    </StarChartContext.Provider>
  )
}