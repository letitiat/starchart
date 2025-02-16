import { useContext } from "react";
import { StarChartContext } from "../../../providers/StarChartProvider";
import { Editable } from "../../common/editable/Editable";
import { taskService } from "../../../services/taskService";

type EditTaskProps = {
  text: string;
}

export const EditTask = ({ text }: EditTaskProps) => {
  const { tasks, setTasks } = useContext(StarChartContext)


  const saveChanges = (updatedTaskName: string) => {
    if (!updatedTaskName) return; // error handle

    const existingTaskName = taskService.findTaskByTaskName(tasks, updatedTaskName);

    if (!existingTaskName) {
      setTasks((prev) =>
        prev.map((task) =>
          task.taskName === text
            ? taskService.updateTaskName(task, updatedTaskName)
            : task
        ))
    } else {
      // error handle
    }
  }

  return (
    <Editable text={text} handleOnSave={saveChanges} />
  )
}