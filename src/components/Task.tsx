import { useContext } from "react"
import { ITask } from "../types"
import { Star } from "./Star"
import { StarChartContext } from "../providers/StarChartProvider"


type TaskProps = {
  task: ITask
}

export const Task = ({ task: { taskName, stars } }: TaskProps) => {
  const {setTasks, tasks} = useContext(StarChartContext)

  const handleOnClick = (i: number, star: string) => {
    return (() => {
      let taskToModify = tasks.find(({ taskName: name }) => name === taskName);

      if (!taskToModify) return;

      switch (star) {
        case "filled":
          taskToModify.stars[i] = "unfilled";
          break

        case "unfilled":
          taskToModify.stars[i] = "filled";
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
    <div>
      <p>{taskName}</p>
      {
        stars.map((star, i) => (
          <Star key={`${star}-${i}`} state={star} handleOnClick={handleOnClick(i, star)} />
        ))
      }
    </div>
  )
}