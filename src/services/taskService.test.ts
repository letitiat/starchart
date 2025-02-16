import { expect, test } from 'vitest'
import { taskService } from './taskService'
import { describe } from 'node:test'
import dayjs from 'dayjs'
import { ITask } from '../types/types'


describe('taskService', () => {
  describe('generateTaskHistory', () => {
    test("generates history when given array of tasks", () => {
      const tasks: ITask[] = [{
        "taskName": "Gym",
        "taskId": '1',
        "days": [
          "enabled",
          "disabled",
          "enabled",
          "enabled",
          "enabled",
          "enabled",
          "enabled"
        ]
      }]

      const history = [
        {
          "date": "10/02/2025",
          "tasks": [
            {
              "status": "skipped",
              "task": "Gym",
            },
          ],
        },
        {
          "date": "11/02/2025",
          "tasks": [
            {
              "status": "disabled",
              "task": "Gym",
            },
          ],
        },
        {
          "date": "12/02/2025",
          "tasks": [
            {
              "status": "skipped",
              "task": "Gym",
            },
          ],
        },
        {
          "date": "13/02/2025",
          "tasks": [
            {
              "status": "skipped",
              "task": "Gym",
            },
          ],
        },
        {
          "date": "14/02/2025",
          "tasks": [
            {
              "status": "skipped",
              "task": "Gym",
            },
          ],
        },
        {
          "date": "15/02/2025",
          "tasks": [
            {
              "status": "skipped",
              "task": "Gym",
            },
          ],
        },
        {
          "date": "16/02/2025",
          "tasks": [
            {
              "status": "skipped",
              "task": "Gym",
            },
          ],
        },
      ]

      const lastSeen = dayjs("2025-02-16T23:59:59.057Z");

      const result = taskService.generateTaskHistory(lastSeen, tasks)
      expect(result).toEqual(history)
    })

    test("handles an empty array of tasks", () => {
      const tasks: ITask[] = []

      const history = [
        {
          "date": "10/02/2025",
          "tasks": [],
        },
        {
          "date": "11/02/2025",
          "tasks": [],
        },
        {
          "date": "12/02/2025",
          "tasks": [],
        },
        {
          "date": "13/02/2025",
          "tasks": [],
        },
        {
          "date": "14/02/2025",
          "tasks": [],
        },
        {
          "date": "15/02/2025",
          "tasks": [],
        },
        {
          "date": "16/02/2025",
          "tasks": [],
        },
      ]

      const lastSeen = dayjs("2025-02-16T23:59:59.057Z");

      const result = taskService.generateTaskHistory(lastSeen, tasks)
      expect(result).toEqual(history)
    })

    test("handles invalid task status", () => {
      const tasks: ITask[] = [{ taskName: "Test", taskId: '1', days: ["invalid" as any] }];

      const history = [
        {
          "date": "10/02/2025",
          "tasks": [
            {
              "status": "skipped",
              "task": "Test",
            },
          ],
        },
        {
          "date": "11/02/2025",
          "tasks": [
            {
              "status": "skipped",
              "task": "Test",
            },
          ],
        },
        {
          "date": "12/02/2025",
          "tasks": [
            {
              "status": "skipped",
              "task": "Test",
            },
          ],
        },
        {
          "date": "13/02/2025",
          "tasks": [
            {
              "status": "skipped",
              "task": "Test",
            },
          ],
        },
        {
          "date": "14/02/2025",
          "tasks": [
            {
              "status": "skipped",
              "task": "Test",
            },
          ],
        },
        {
          "date": "15/02/2025",
          "tasks": [
            {
              "status": "skipped",
              "task": "Test",
            },
          ],
        },
        {
          "date": "16/02/2025",
          "tasks": [
            {
              "status": "skipped",
              "task": "Test",
            },
          ],
        },
      ];

      const result = taskService.generateTaskHistory(dayjs("2025-02-16T23:59:59.057Z"), tasks);
      expect(result).toEqual(history);
    })

    test("handles the end of week boundary correctly", () => {
      const tasks: ITask[] = [{ taskName: "Test", taskId: '1', days: ["enabled"] }];

      const lastSeen = dayjs("2025-02-16T23:59:59.057Z"); // sunday 23:59
      const result = taskService.generateTaskHistory(lastSeen, tasks);
      expect(result[0].date).toBe("10/02/2025");
    });

    test("handles the start of the week boundary correctly", () => {
      const tasks: ITask[] = [{ taskName: "Test", taskId: '1', days: ["enabled"] }];

      const lastSeen = dayjs("2025-02-17T00:00:10.057Z"); // sunday 23:59
      const result = taskService.generateTaskHistory(lastSeen, tasks);
      expect(result[0].date).toBe("17/02/2025");
    });
  })

  describe('toggleTaskDaysToUncheckedState', () => {
    test('should toggle selected days to enabled', () => {
      const tasks: ITask[] = [{
        "taskName": "Gym",
        "taskId": '1',
        "days": [
          "selected",
          "disabled",
          "selected",
          "selected",
          "selected",
          "selected",
          "disabled"
        ]
      },
      {
        "taskName": "Not Gym",
        "taskId": '2',
        "days": [
          "enabled",
          "disabled",
          "selected",
          "enabled",
          "selected",
          "enabled",
          "disabled"
        ]
      }];

      const expectedReturnedTasks = [
        {
          "days": [
            "enabled",
            "disabled",
            "enabled",
            "enabled",
            "enabled",
            "enabled",
            "disabled",
          ],
          "taskId": "1",
          "taskName": "Gym",
        },
        {
          "days": [
            "enabled",
            "disabled",
            "enabled",
            "enabled",
            "enabled",
            "enabled",
            "disabled",
          ],
          "taskId": "2",
          "taskName": "Not Gym",
        },
      ];

      const result = taskService.toggleTaskDaysToUncheckedState(tasks);
      expect(result).toEqual(expectedReturnedTasks);
    })
  })

  describe('toggleTaskDayAtIndex', () => {
    test('should toggle day to specific index', () => {
      const task: ITask = {
        "taskName": "Gym",
        "taskId": '1',
        "days": [
          "selected",
          "disabled",
          "selected",
          "selected",
          "selected",
          "selected",
          "disabled"
        ]
      };

      const expectedReturnedTasks = {
        "days": [
          "selected",
          "disabled",
          "enabled",
          "selected",
          "selected",
          "selected",
          "disabled",
        ],
        "taskId": '1',
        "taskName": "Gym",
      };

      const result = taskService.toggleTaskDayAtIndex(task, 2);
      expect(result).toEqual(expectedReturnedTasks);
    })
  })

  describe('toggleTaskDaysDefaultState', () => {
    test('should toggle all days in task to enabled', () => {
      const task: ITask = {
        "taskName": "Gym",
        "taskId": '1',
        "days": [
          "enabled",
          "disabled",
        ]
      };

      const expectedReturnedTasks = {
        "days": [
          "enabled",
          "enabled",
        ],
        "taskId": '1',
        "taskName": "Gym",
      };

      const result = taskService.toggleTaskDaysDefaultState(task, true);
      expect(result).toEqual(expectedReturnedTasks);
    })

    test('should toggle all days in task to disabled', () => {
      const task: ITask = {
        "taskName": "Gym",
        "taskId": '1',
        "days": [
          "enabled",
          "disabled",
          "disabled",
        ]
      };

      const expectedReturnedTasks = {
        "days": [
          "disabled",
          "disabled",
          "disabled",
        ],
        "taskId": '1',
        "taskName": "Gym",
      };

      const result = taskService.toggleTaskDaysDefaultState(task, false);
      expect(result).toEqual(expectedReturnedTasks);
    })
  })

  describe('findTaskByTaskName', () => {
    test('should return task with matching name from list of tasks', () => {
      const tasks: ITask[] = [
        {
          "taskName": "Gym",
          "taskId": '1',
          "days": [
            "enabled",
            "disabled",
            "disabled",
          ]
        },
        {
          "taskName": "Run",
          "taskId": '2',
          "days": [
            "enabled",
            "disabled",
            "disabled",
          ]
        }
      ];

      const expectedReturnedTasks = {
        "days": [
          "enabled",
          "disabled",
          "disabled",
        ],
        "taskId": '2',
        "taskName": "Run",
      };

      const result = taskService.findTaskByTaskName(tasks, 'Run');
      expect(result).toEqual(expectedReturnedTasks);
    })

    test('should return undefined if no matching task', () => {
      const tasks: ITask[] = [
        {
          "taskName": "Gym",
          "taskId": '1',
          "days": [
            "enabled",
            "disabled",
            "disabled",
          ]
        },
        {
          "taskName": "Run",
          "taskId": '2',
          "days": [
            "enabled",
            "disabled",
            "disabled",
          ]
        }
      ];

      const result = taskService.findTaskByTaskName(tasks, 'boo');
      expect(result).toEqual(undefined);
    })
  })

  describe('updateTaskName', () => {
    test('should update the task with new task name', () => {
      const task: ITask = {
        "taskName": "Gym",
        "taskId": '1',
        "days": [
          "selected",
          "disabled",
          "selected",
          "selected",
          "selected",
          "selected",
          "disabled"
        ]
      };

      const expectedReturnedTask = {
        "days": [
          "selected",
          "disabled",
          "selected",
          "selected",
          "selected",
          "selected",
          "disabled",
        ],
        "taskId": '1',
        "taskName": "New Name",
      };

      const result = taskService.updateTaskName(task, 'New Name');
      expect(result).toEqual(expectedReturnedTask);
    })
  })
})