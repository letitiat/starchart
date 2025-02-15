import { Modal } from "../../common/modal/Modal";
import { useContext, useEffect, useState } from "react";
import { ITask } from "../../../types/types";
import { StarChartContext } from "../../../providers/StarChartProvider";
import { Checkbox } from "../../common/checkbox/Checkbox";
import './AddTask.scss'

const DAYS_OF_WEEK = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

const DEFAULT_TASK: ITask = {
  taskName: "",
  stars: Array.from({ length: 7 }).map(() => "disabled")
};
export const AddTask = () => {
  const { tasks, setTasks } = useContext(StarChartContext);
  const [defaultChecked, setDefaultChecked] = useState(true)
  const [newTask, setNewTask] = useState<ITask>(DEFAULT_TASK);

  const handleCheckboxChange = (mapIndex: number) => {
    setNewTask((prev) => ({
      ...prev,
      stars: prev.stars.map((star, i) => {
        if (i !== mapIndex) return star;
        return star === "unfilled" ? "disabled" : "unfilled"
      })
    }))
  }

  useEffect(() => (
    setNewTask((prev) => ({
      ...prev,
      stars: prev.stars.map(() => defaultChecked ? "unfilled" : "disabled")
    }))
  ), [defaultChecked]);

  const handleOnClose = () => {
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

          <Checkbox checkboxText="Check All Days" defaultChecked={defaultChecked} handleCheckboxChange={(e) => setDefaultChecked(!!e)} />

          {/* Day of week checkboxes */}
          <div className="checkbox-group">
            {
              DAYS_OF_WEEK.map((day, i) => (
                <Checkbox defaultChecked={defaultChecked} className="day-checkbox" checkboxText={day} handleCheckboxChange={() => handleCheckboxChange(i)} variant="icon" />
              ))
            }
          </div>
          {/* End of Day of week checkboxes */}
        </>
      </Modal>
  )
}