import { useContext } from "react"
import { ITask } from "../../types/types"
import { Star } from "../star/Star"
import { StarChartContext } from "../../providers/StarChartProvider"
import { EditTask } from "./edit-task/EditTask"


type TaskProps = {
  task: ITask
}

export const Task = ({ task: { taskName, days } }: TaskProps) => {
  const {setTasks, tasks} = useContext(StarChartContext)

  const handleOnClick = (i: number, star: string) => {
    return (() => {
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
          <Star key={`${day}-${i}`} state={day} handleOnClick={handleOnClick(i, day)} />
        ))
      }
      {/* <EditTask /> */}
    </>
  )
}