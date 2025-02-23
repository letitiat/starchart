import { useContext } from "react"
import { Modal } from "../common/modal/Modal"
import { StarChartContext } from "../../providers/StarChartProvider"
import { taskService } from "../../services/taskService";
import styles from './StatsModal.module.scss'

export const StatsModal = () => {
  const { tasks, setShowStats } = useContext(StarChartContext);

  const eligibleStars = taskService.getEligibleWeeklyStarCount(tasks);
  const achievedStars = taskService.getAchievedWeeklyStarCount(tasks);

  const lowestAchievedStat = tasks.reduce((acc, currentValue) => {
    const currentPercentageAchieved = taskService.getTaskCompletionPercentage(currentValue);
    const prevCurrentPercentageAchieved = taskService.getTaskCompletionPercentage(acc);

    return (currentPercentageAchieved < prevCurrentPercentageAchieved)
      ? currentValue
      : acc
  })

  return (
    <Modal
      modalTitle="Weekly Stats"
      handleOnClose={() => setShowStats(false)}
      isOpen
    >
      <div className={styles.StatsModalContainer}>
        <p>You got {achievedStars} stars out of a possible {eligibleStars}!</p>
        <p>Good job! ☺</p>
        {
          taskService.getTaskCompletionPercentage(lowestAchievedStat) < 100 && (
            <>
              <p>The task you struggled on most was {lowestAchievedStat.taskName}, with a {taskService.getTaskCompletionPercentage(lowestAchievedStat).toFixed()}% completion rate.</p>
              <p>It might be worth considering changing the frequency of this task in the future.</p>
            </>
          )
        }
      </div>
    </Modal>
  )
}