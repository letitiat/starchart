import { describe, expect, test } from "vitest";
import dayjs, { getEndOfWeek, getStartOfWeek } from "./dayjs";

describe('dayjs utils', () => {
  describe('getStartOfWeek', () => {
    test('expect start of week to be a Monday', () => {
      const day = dayjs("2025-02-22T18:42:11.368Z");

      const startOfWeek = getStartOfWeek(day);
      const expectedMonday = "2025-02-17T00:00:00.000Z"; // The Monday of that week

      expect(startOfWeek.toISOString()).toBe(expectedMonday);
    })
  }),
    describe('getEndOfWeek', () => {
      test('expect end of week to be a Sunday', () => {
        const day = dayjs("2025-02-22T18:42:11.368Z");

        const endOfWeek = getEndOfWeek(day);
        const expectedSunday = "2025-02-23T23:59:59.999Z"; // The Sunday of that week

        expect(endOfWeek.toISOString()).toBe(expectedSunday);
      })
    })
})