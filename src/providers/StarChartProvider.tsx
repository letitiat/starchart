import { createContext, ReactNode, useEffect, useState } from "react"
import { IStarChartContent } from "../types/types";
import { getLocaleStorage, setLocaleStorage } from "../utils/utils";

const INITIAL__TASKS: IStarChartContent['tasks'] = [
  {
    taskName: 'Gym',
    stars: ["unfilled", "disabled", "filled", "filled", "unfilled", "filled", "unfilled"]
  },
  {
    taskName: 'Food',
    stars: ["unfilled", "filled", "filled", "filled", "disabled", "filled", "filled"]
  }
]

export const StarChartContext = createContext<IStarChartContent>({tasks: INITIAL__TASKS, setTasks: () => {}});

export const StarChartProvider = ({children}: {children: ReactNode}) => {
  const [tasks, setTasks] = useState(() => {
    return getLocaleStorage('INITIAL_TASKS') ?? INITIAL__TASKS
  });

  useEffect(() => {
    setLocaleStorage('INITIAL_TASKS', tasks)
    console.log('setting stroage')
  }, [tasks])

  return (
    <StarChartContext.Provider value={{tasks: tasks, setTasks: setTasks}}>
      {children}
    </StarChartContext.Provider> 
  )
}