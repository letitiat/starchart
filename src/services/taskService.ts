
import { DayState, HistoryStatus, ITask, ITaskHistory } from "../types/types";
import dayjs, { getStartOfWeek } from "../utils/dayjs";

const historyStatus: Record<DayState, HistoryStatus> = {
  disabled: 'disabled',
  enabled: 'skipped',
  selected: 'completed',
}

/**
 * Gets the history status corresponding to the given DayState.
 * @param status The current status of the day (e.g., 'disabled', 'enabled', 'selected').
 * @returns The corresponding history status.
 */
const getHistoryStatus = (status: DayState): HistoryStatus => historyStatus[status] || historyStatus.enabled;

export const taskService = {
  /**
 * Generates task history for the past 7 days, based on the provided tasks and the last seen date.
 * @param lastSeen The date the user was last active (used to determine the start of the week).
 * @param tasks The list of tasks to generate history for.
 * @returns A list of task history for the past week, with each day's status for each task.
 */
  generateTaskHistory: (
    lastSeen: dayjs.Dayjs,
    tasks: ITask[]
  ) => {
    const lastSeenWeekStart = getStartOfWeek(lastSeen);

    const daysToMapOver: { date: string }[] = Array.from({ length: 7 }, (_, i) =>
      ({ date: lastSeenWeekStart.add(i, 'day').format('DD/MM/YYYY') }));

    const history: ITaskHistory[] = daysToMapOver.map(({ date }, i) => ({
      date,
      tasks: tasks.map((task) => ({
        task: task.taskName,
        status: getHistoryStatus(task.days[i] || 'enabled')
      }))
    }))

    return history;
  },

  /**
    * Resets the task list to the initial unchecked or disabled state.
    * @param tasks The list of tasks to reset.
    * @returns A new list of tasks with all days set to their initial unchecked state.
    */
  toggleTaskDaysToUncheckedState: (tasks: ITask[]) => tasks.map((task) => ({
    ...task,
    days: task.days.map((status) => status === 'selected' ? 'enabled' : status)
  })),

  /**
     * Resets the task day at specific index to disabled or enabled status, depending on the current status of the given day.
     * @param task The task to modify.
     * @param mapIndex The index of the day in the task's days array to toggle.
     * @returns A new task with the specified day toggled between 'enabled' and 'disabled'.
     */
  toggleTaskDayAtIndex: (task: ITask, mapIndex: number) => ({
    ...task,
    days: task.days.map((day, i) => {
      if (i !== mapIndex) return day;
      return day === "enabled" ? "disabled" : "enabled"
    })
  }),

  /**
   * Toggles the task days between disabled and enabled based on the given defaultChecked flag.
   * @param task The task to modify.
   * @param initialState The flag to determine the initial state of the task days (true = enabled, false = disabled).
   * @returns A new task with all days set to either 'enabled' or 'disabled', based on the defaultChecked flag.
   */
  toggleTaskDaysDefaultState: (task: ITask, initialState: boolean) => ({
    ...task,
    days: task.days.map(() => initialState ? "enabled" : "disabled")
  }),

  /**
   * Finds a task by task name
   * @param tasks 
   * @param nameToMatch 
   * @returns 
   */
  findTaskByTaskName: (tasks: ITask[], nameToMatch: string) => tasks.find(({ taskName }) => taskName === nameToMatch),

  /**
   * Updates task name in task.
   * @param task The task to modify.
   * @returns A modified task with the new task name.
   */
  updateTaskName: (task: ITask, taskName: string) => ({ ...task, taskName: taskName }),

  /**
  * Gets count of total non-disabled star count for a single task.
  * @param task The task to count.
  * @returns The number of selectable stars.
  */
  getEligibleStarCount: (task: ITask) => task.days.filter((day) => day !== 'disabled').length,

  /**
  * Gets count of total non-disabled star count for all tasks.
  * @param tasks The tasks to count.
  * @returns The number of selectable stars.
  */
  getEligibleWeeklyStarCount: (tasks: ITask[]) => tasks
    .map((task) => taskService.getEligibleStarCount(task))
    .reduce((sum, num) => sum + num),

  /**
   * Gets count of total selected/achieved star count for a single task.
   * @param task The task to count.
   * @returns The number of selected/achieved stars.
   */
  getAchievedStarCount: (task: ITask) => task.days.filter((day) => day === 'selected').length,

  /**
 * Gets count of total selected/achieved star count for all tasks.
 * @param tasks The tasks to count.
 * @returns The number of selected/achieved stars.
 */
  getAchievedWeeklyStarCount: (tasks: ITask[]) => tasks
    .map((task) => taskService.getAchievedStarCount(task))
    .reduce((sum, num) => sum + num),

  /**
 * Gets task completion percentage for a task.
 * @param task The task to count.
 * @returns The percentage stat achieved.
 */
  getTaskCompletionPercentage: (task: ITask) => {
    const eligibleStars = taskService.getEligibleStarCount(task);
    const achievedStars = taskService.getAchievedStarCount(task);
    return achievedStars / eligibleStars * 100;
  },

  /**
   * Gets enabled task count for task. This is a count of how many days left could be completed. 0 would be a complete task for that week..
   * @param task The task to count.
   * @returns The number of tasks left to be 'completed'.
   */
  getEnabledDaysLeftOfTaskCount: (task: ITask) => task.days.filter((day) => day === "enabled").length,

  /**
 * Gets enabled days left task count for all tasks across the week.
 * @param task The task to count.
 * @returns The number of tasks left to be 'completed'.
 */
  getEnabledDaysLeftForAllTasksCount: (tasks: ITask[]) => tasks
    .map((task) => taskService.getEnabledDaysLeftOfTaskCount(task))
    .reduce((sum, num) => sum + num)
};
