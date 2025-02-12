import { useContext } from "react";
import { Task } from "../tasks/Task";
import styles from './StarChart.module.scss';
import { AddTask } from "../tasks/add-task/AddTask";
import { StarChartContext } from "../../providers/StarChartProvider";

const DAYS_OF_WEEK = ['', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];

export const StartChart = () => {

    const { tasks } = useContext(StarChartContext);
    const currentDay = new Date().getDay();
  
  return (
    <div className="starchart-container">
      <h1>Silly Little Motivation Chart</h1>
      <div className={styles.chart} data-selected={currentDay}>
        {/* Overlay for overlay column */}
        <div className={styles.chart__overlay}>
          {DAYS_OF_WEEK.map((day, i) => (
            <div className={`${currentDay === i ? styles.chart__daySelected  : ""}`} key={day}></div>
          ))}
        </div>

        {/* Content */}
        {DAYS_OF_WEEK.map((day) => (
          <p key={day}>{day}</p>
        ))}
        {
          tasks.map((task) => (
            <Task task={task} key={task.taskName} />
          ))
        }
      </div>
      <AddTask />
    </div>
  );
}