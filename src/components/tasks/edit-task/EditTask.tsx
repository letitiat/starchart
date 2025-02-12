import { useContext } from "react";
import { StarChartContext } from "../../../providers/StarChartProvider";
import { Editable } from "../../common/editable/Editable";

type EditTaskProps = {
  text: string;
}

export const EditTask = ({ text }: EditTaskProps) => {
  const {tasks, setTasks} = useContext(StarChartContext)


  const saveChanges = (updatedTaskName: string) => {
    console.log(updatedTaskName, 'goddit')
    if (!updatedTaskName) return; // error handle

    const existingTaskName = tasks.find(({taskName}) => taskName === updatedTaskName);

    if (!existingTaskName) {
      setTasks((prev) => prev.map((task) => task.taskName === text ? {...task, taskName: updatedTaskName} : task))
    } else {
      // error handle
    }
  }

  return (
    <Editable text={text} handleOnSave={saveChanges} />
  )
}