import { useContext } from "react"
import { ITask } from "../../types/types"
import { Star } from "../star/Star"
import { StarChartContext } from "../../providers/StarChartProvider"
import { EditTask } from "./edit-task/EditTask"
import { triggerTaskCompletionConfetti } from "../../animations/taskCompletionConfetti"
import { taskService } from "../../services/taskService"

type TaskProps = {
  task: ITask
}

export const Task = ({ task: { taskName, days } }: TaskProps) => {
  const {setTasks, tasks, setShowStats} = useContext(StarChartContext)

  const handleOnClick = (i: number, star: string) => {
    return ((e: React.MouseEvent) => {
      let taskToModify = tasks.find(({ taskName: name }) => name === taskName);

      if (!taskToModify) return;

      switch (star) {
        case "selected":
          taskToModify.days[i] = "enabled";
          break

        case "enabled":
          taskToModify.days[i] = "selected";
          break
      }

      // If, after this step, we can't find any enabled days left in our days, it means the task
      // is 'completed' for this week
      if (!taskService.getEnabledDaysLeftOfTaskCount(taskToModify)) {
        triggerTaskCompletionConfetti(e.clientX, e.clientY);

        if (!taskService.getEnabledDaysLeftForAllTasksCount(tasks)) {
          setShowStats(true)
        }
      }

      setTasks((prev: ITask[]) =>
        prev.map((task) =>
          task.taskName === taskName ? taskToModify : task
        )
      );      
    })
  }
  return (
    <>
    <EditTask text={taskName} />
      {
        days.map((day, i) => (
          <Star key={`${taskName}-${day}-${i}`} state={day} handleOnClick={handleOnClick(i, day)} />
        ))
      }
    </>
  )
}