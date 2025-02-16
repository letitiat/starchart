import { Modal } from "../../common/modal/Modal";
import { useContext, useState } from "react";
import { ITask } from "../../../types/types";
import { StarChartContext } from "../../../providers/StarChartProvider";
import { Checkbox } from "../../common/checkbox/Checkbox";
import { taskService } from "../../../services/taskService";
import { v4 as uuidv4 } from 'uuid';
import './AddTask.scss'

const DAYS_OF_WEEK = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

const DEFAULT_TASK: ITask = {
  taskName: "",
  taskId: uuidv4(),
  days: Array.from({ length: 7 }).map(() => "enabled")
};
export const AddTask = () => {
  const { tasks, setTasks } = useContext(StarChartContext);
  const [allDaysChecked, setAllDaysChecked] = useState(true)
  const [newTask, setNewTask] = useState<ITask>(DEFAULT_TASK);

  const handleCheckboxChange = (mapIndex: number) => {
    setNewTask((prev) => {
      const updatedTask = taskService.toggleTaskDayAtIndex(prev, mapIndex);

      const allSelected = updatedTask.days.every((day) => day === "enabled");
      setAllDaysChecked(allSelected);

      return updatedTask;
    })
  }

  const handleCheckAll = () => {
    setAllDaysChecked((prev) => !prev);
    setNewTask((prev) => taskService.toggleTaskDaysDefaultState(prev, !allDaysChecked))
  }

  const handleOnClose = () => {
    if (!newTask.taskName.trim()) return;

    const entryExists = tasks.find(({ taskName }) => taskName === newTask.taskName);

    if (newTask.taskName && !entryExists) {
      setTasks((prev) => [...prev, newTask])
      setNewTask(DEFAULT_TASK)
    }
  }

  return (
    <Modal
      triggerButtonTitle="Add Task"
      handleOnClose={handleOnClose}
      modalTitle="Add A New Task"
      modalDescription="Add a new task and select the days you want to aim to do the task on.
            For example, if you only go to the gym on M/W/F, only tick those days."
    >
      <>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="username">
            Task Name
          </label>
          <input className="Input" id="username" defaultValue="EG: Gym" onChange={(e) => setNewTask((prev) => ({ ...prev, taskName: e.target.value }))} />
        </fieldset>

        <Checkbox checkboxText="Check All Days" defaultChecked={allDaysChecked} handleCheckboxChange={handleCheckAll} />

        {/* Day of week checkboxes */}
        <div className="checkbox-group">
          {
            DAYS_OF_WEEK.map((day, i) => (
              <Checkbox
                key={`${day}-${i}`}
                defaultChecked={newTask.days[i] === 'enabled'}
                className="day-checkbox"
                checkboxText={day}
                handleCheckboxChange={() => handleCheckboxChange(i)}
                variant="icon"
              />
            ))
          }
        </div>
        {/* End of Day of week checkboxes */}
      </>
    </Modal>
  )
}