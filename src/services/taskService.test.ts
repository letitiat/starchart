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
          "unfilled",
          "disabled",
          "unfilled",
          "unfilled",
          "unfilled",
          "unfilled",
          "unfilled"
        ]
      }]

      const history = [
        {
          "date": "17/02/2025",
          "tasks": [
            {
              "status": "failed",
              "task": "Gym",
            },
          ],
        },
        {
          "date": "18/02/2025",
          "tasks": [
            {
              "status": "disabled",
              "task": "Gym",
            },
          ],
        },
        {
          "date": "19/02/2025",
          "tasks": [
            {
              "status": "failed",
              "task": "Gym",
            },
          ],
        },
        {
          "date": "20/02/2025",
          "tasks": [
            {
              "status": "failed",
              "task": "Gym",
            },
          ],
        },
        {
          "date": "21/02/2025",
          "tasks": [
            {
              "status": "failed",
              "task": "Gym",
            },
          ],
        },
        {
          "date": "22/02/2025",
          "tasks": [
            {
              "status": "failed",
              "task": "Gym",
            },
          ],
        },
        {
          "date": "23/02/2025",
          "tasks": [
            {
              "status": "failed",
              "task": "Gym",
            },
          ],
        },
      ]

      const lastSeen = dayjs();

      const result = taskService.generateTaskHistory(lastSeen, tasks)
      expect(result).toEqual(history)
    })

    test("handles an empty array of tasks", () => {
      const tasks: ITask[] = []

      const history = [
        {
          "date": "17/02/2025",
          "tasks": [],
        },
        {
          "date": "18/02/2025",
          "tasks": [],
        },
        {
          "date": "19/02/2025",
          "tasks": [],
        },
        {
          "date": "20/02/2025",
          "tasks": [],
        },
        {
          "date": "21/02/2025",
          "tasks": [],
        },
        {
          "date": "22/02/2025",
          "tasks": [],
        },
        {
          "date": "23/02/2025",
          "tasks": [],
        },
      ]

      const lastSeen = dayjs();

      const result = taskService.generateTaskHistory(lastSeen, tasks)
      expect(result).toEqual(history)
    })

    test("handles invalid task status", () => {
      const tasks: ITask[] = [{ taskName: "Test", taskId: '1', days: ["invalid" as any] }];

      const history = [
        {
          "date": "17/02/2025",
          "tasks": [
            {
              "status": "failed",
              "task": "Test",
            },
          ],
        },
        {
          "date": "18/02/2025",
          "tasks": [
            {
              "status": "failed",
              "task": "Test",
            },
          ],
        },
        {
          "date": "19/02/2025",
          "tasks": [
            {
              "status": "failed",
              "task": "Test",
            },
          ],
        },
        {
          "date": "20/02/2025",
          "tasks": [
            {
              "status": "failed",
              "task": "Test",
            },
          ],
        },
        {
          "date": "21/02/2025",
          "tasks": [
            {
              "status": "failed",
              "task": "Test",
            },
          ],
        },
        {
          "date": "22/02/2025",
          "tasks": [
            {
              "status": "failed",
              "task": "Test",
            },
          ],
        },
        {
          "date": "23/02/2025",
          "tasks": [
            {
              "status": "failed",
              "task": "Test",
            },
          ],
        },
      ];

      const result = taskService.generateTaskHistory(dayjs(), tasks);
      expect(result).toEqual(history);
    })

    test("handles the end of week boundary correctly", () => {
      const tasks: ITask[] = [{ taskName: "Test", taskId: '1', days: ["unfilled"] }];

      const lastSeen = dayjs("2025-02-16T23:59:59.057Z"); // sunday 23:59
      const result = taskService.generateTaskHistory(lastSeen, tasks);
      expect(result[0].date).toBe("10/02/2025");
    });

    test("handles the start of the week boundary correctly", () => {
      const tasks: ITask[] = [{ taskName: "Test", taskId: '1', days: ["unfilled"] }];

      const lastSeen = dayjs("2025-02-17T00:00:10.057Z"); // sunday 23:59
      const result = taskService.generateTaskHistory(lastSeen, tasks);
      expect(result[0].date).toBe("17/02/2025");
    });
  })
})