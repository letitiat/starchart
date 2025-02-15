export type DayState = "unfilled" | "filled" | "disabled";
export type HistoryStatus = "completed" | "failed" | "disabled";

export interface ITask {
  taskName: string,
  taskId: string,
  days: DayState[]
};

export interface ITaskHistory {
  date: string,
  tasks: {
    task: string,
    status: HistoryStatus
  }[]
};

export interface IStarChartContent {
  tasks: ITask[],
  setTasks: (task: ITask[] | ((prev: ITask[]) => ITask[])) => void;
}
