export type StarTypes = "unfilled" | "filled" | "disabled";

export interface ITask {
  taskName: string,
  stars: StarTypes[]
};

export interface IStarChartContent {
  tasks: ITask[],
  setTasks: (task: ITask[] | ((prev: ITask[]) => ITask[])) => void;
}
