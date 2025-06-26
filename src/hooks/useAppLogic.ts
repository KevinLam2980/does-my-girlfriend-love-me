import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { Cycle, Event, CycleInfo, ChartDataPoint, Stats } from '../types';
import regression from 'regression';

export const useAppLogic = () => {
  const { cycles, selectedCycle } = useAppSelector((state: any) => state.cycles);
  const { events } = useAppSelector((state: any) => state.events);
  const { defaultCycleData } = useAppSelector((state: any) => state.settings);

  // Sort cycles by start date (most recent first)
  const sortedCycles = useMemo(() => 
    [...cycles].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()),
    [cycles]
  );

  // Get cycle information including calculated length
  const getCycleWithLength = (cycle: Cycle, index: number): Cycle => {
    if (index === 0) {
      return { ...cycle, displayLength: defaultCycleData.averageCycleLength };
    }

    // For previous cycles, calculate the actual length if we have the next cycle
    const nextCycle = sortedCycles[index - 1]; // Next cycle is more recent (lower index)
    if (nextCycle) {
      const current = new Date(cycle.startDate);
      const next = new Date(nextCycle.startDate);
      const calculatedLength = Math.round((next.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));
      return {
        ...cycle,
        calculatedLength,
        displayLength: calculatedLength > 0 ? calculatedLength : defaultCycleData.averageCycleLength
      };
    }
    
    // Fallback to default if calculation fails
    return {
      ...cycle,
      calculatedLength: undefined,
      displayLength: defaultCycleData.averageCycleLength
    };
  };

  // Calculate which cycle a date belongs to and what day within that cycle
  const getCycleInfo = (date: string): CycleInfo => {
    if (sortedCycles.length === 0) return { cycleNumber: null, cycleDay: null, cycle: null };
    
    const eventDate = new Date(date);
    // Ensure we're working with just the date part
    eventDate.setHours(0, 0, 0, 0);
    
    // Check each cycle in chronological order (sortedCycles is newest first)
    for (let i = 0; i < sortedCycles.length; i++) {
      const cycle = sortedCycles[i];
      const cycleStart = new Date(cycle.startDate);
      cycleStart.setHours(0, 0, 0, 0);
      
      const cycleWithLength = getCycleWithLength(cycle, i);
      const cycleEnd = new Date(cycleStart);
      cycleEnd.setDate(cycleEnd.getDate() + cycleWithLength.displayLength! - 1);
      cycleEnd.setHours(23, 59, 59, 999);
      
      if (eventDate >= cycleStart && eventDate <= cycleEnd) {
        const diffTime = eventDate.getTime() - cycleStart.getTime();
        const cycleDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return { cycleNumber: i, cycleDay, cycle: cycleWithLength };
      }
    }
    
    return { cycleNumber: null, cycleDay: null, cycle: null };
  };

  // Get events for a specific cycle
  const getEventsForCycle = (cycleNumber: number): Event[] => {
    if (cycleNumber >= sortedCycles.length || cycleNumber < 0) return [];
    
    const targetCycle = sortedCycles[cycleNumber];
    const cycleStart = new Date(targetCycle.startDate);
    cycleStart.setHours(0, 0, 0, 0);
    
    const cycle = getCycleWithLength(targetCycle, cycleNumber);
    const cycleEnd = new Date(cycleStart);
    cycleEnd.setDate(cycleEnd.getDate() + cycle.displayLength! - 1);
    cycleEnd.setHours(23, 59, 59, 999);
    
    return events.filter((event: Event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(12, 0, 0, 0); // Set to noon for comparison
      return eventDate >= cycleStart && eventDate <= cycleEnd;
    });
  };

  // Calculate next period prediction using regression
  const calculateNextPeriod = (): Date | null => {
    if (sortedCycles.length === 0) return null;
    const mostRecentCycle = sortedCycles[0];
    const lastPeriodStart = new Date(mostRecentCycle.startDate);
    if (sortedCycles.length === 1) {
      // Only one cycle recorded, use default average
      const nextPeriod = new Date(lastPeriodStart);
      nextPeriod.setDate(nextPeriod.getDate() + defaultCycleData.averageCycleLength);
      return nextPeriod;
    }
    // Prepare data for regression: x = cycle index, y = cycle length
    const cycleLengths: number[] = [];
    for (let i = 0; i < sortedCycles.length - 1; i++) {
      const current = new Date(sortedCycles[i].startDate);
      const next = new Date(sortedCycles[i + 1].startDate);
      const length = Math.round((current.getTime() - next.getTime()) / (1000 * 60 * 60 * 24));
      if (length > 0) {
        cycleLengths.push(length);
      }
    }
    // If not enough data, fall back to average
    if (cycleLengths.length < 3) {
      const avg = cycleLengths.length > 0 ? Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length) : defaultCycleData.averageCycleLength;
      const nextPeriod = new Date(lastPeriodStart);
      nextPeriod.setDate(nextPeriod.getDate() + avg);
      return nextPeriod;
    }
    // Use polynomial regression (degree 2)
    const data: [number, number][] = cycleLengths.map((y, i) => [i, y]);
    const poly = regression.polynomial(data, { order: 2 });
    const nextLengthPoly = Math.round(poly.predict(data.length)[1]);
    // Use exponential regression
    const exp = regression.exponential(data);
    const nextLengthExp = Math.round(exp.predict(data.length)[1]);
    // Average the two predictions for robustness
    const nextLength = Math.round((nextLengthPoly + nextLengthExp) / 2);
    const nextPeriod = new Date(lastPeriodStart);
    nextPeriod.setDate(nextPeriod.getDate() + nextLength);
    return nextPeriod;
  };

  // Prepare data for visualization for a specific cycle
  const prepareChartData = (cycleNumber: number): ChartDataPoint[] => {
    if (sortedCycles.length === 0 || cycleNumber >= sortedCycles.length || cycleNumber < 0) {
      return [];
    }
    
    const cycle = getCycleWithLength(sortedCycles[cycleNumber], cycleNumber);
    const cycleDayMap: { [key: number]: ChartDataPoint } = {};
    
    // Initialize all cycle days with 0 counts for each event type
    for (let i = 1; i <= cycle.displayLength!; i++) {
      cycleDayMap[i] = {
        cycleDay: i,
        nice: 0,
        mean: 0,
        argument: 0,
        gift: 0,
        food: 0,
        phase: getCyclePhase(i, cycle.periodLength)
      };
    }
    
    // Get events for this specific cycle using the filtered events
    const cycleEvents = getEventsForCycle(cycleNumber);
    
    // Count events by cycle day for the specific cycle
    cycleEvents.forEach(event => {
      const eventInfo = getCycleInfo(event.date);
      if (eventInfo.cycleDay && eventInfo.cycleNumber === cycleNumber && cycleDayMap[eventInfo.cycleDay]) {
        cycleDayMap[eventInfo.cycleDay][event.type] = (cycleDayMap[eventInfo.cycleDay][event.type] || 0) + 1;
      }
    });
    
    return Object.values(cycleDayMap);
  };

  // Get phase label for a given cycle day
  const getCyclePhase = (day: number, periodLength: number = defaultCycleData.periodLength): string => {
    if (!day) return 'Unknown';
    
    if (day <= periodLength) return 'Menstruation';
    if (day <= 14) return 'Follicular';
    if (day === 14) return 'Ovulation';
    return 'Luteal';
  };

  // Calculate statistics for summary
  const calculateStats = (cycleNumber: number | null = null): Stats => {
    const eventsByType = {
      nice: 0,
      mean: 0,
      argument: 0,
      gift: 0,
      food: 0
    };
    
    const eventsByPhase = {
      'Menstruation': { nice: 0, mean: 0, argument: 0, gift: 0, food: 0 },
      'Follicular': { nice: 0, mean: 0, argument: 0, gift: 0, food: 0 },
      'Ovulation': { nice: 0, mean: 0, argument: 0, gift: 0, food: 0 },
      'Luteal': { nice: 0, mean: 0, argument: 0, gift: 0, food: 0 }
    };
    
    let eventsToAnalyze = events;
    
    // If analyzing a specific cycle, filter events
    if (cycleNumber !== null) {
      eventsToAnalyze = getEventsForCycle(cycleNumber);
    }
    
    eventsToAnalyze.forEach((event: Event) => {
      const eventType = event.type as keyof typeof eventsByType;
      if (eventType in eventsByType) {
        eventsByType[eventType] = (eventsByType[eventType] || 0) + 1;
      }
      
      // Get the phase for this event
      const eventInfo = getCycleInfo(event.date);
      if (eventInfo.cycleDay && eventInfo.cycle) {
        const phase = getCyclePhase(eventInfo.cycleDay, eventInfo.cycle.periodLength);
        if (phase in eventsByPhase) {
          const phaseKey = phase as keyof typeof eventsByPhase;
          const eventTypeKey = eventType as keyof typeof eventsByPhase[typeof phaseKey];
          if (eventTypeKey in eventsByPhase[phaseKey]) {
            eventsByPhase[phaseKey][eventTypeKey] = (eventsByPhase[phaseKey][eventTypeKey] || 0) + 1;
          }
        }
      }
    });
    
    const totalEvents = eventsToAnalyze.length;
    
    return {
      totalEvents,
      eventsByType,
      eventsByPhase
    };
  };

  // Calculate the max value for Y-axis
  const getMaxYValue = (data: ChartDataPoint[]): number => {
    if (!data || data.length === 0) return 1;
    
    let maxValue = 0;
    data.forEach(day => {
      const dayTotal = day.nice + day.mean + day.argument + day.gift + day.food;
      maxValue = Math.max(maxValue, dayTotal);
    });
    
    // Return max + 1 for extra space, minimum of 1
    return Math.max(maxValue + 1, 1);
  };

  // Format cycle display name
  const formatCycleDisplay = (cycleNumber: number): string => {
    if (sortedCycles.length === 0) return 'No Cycles';
    if (cycleNumber === 0) return 'Current Cycle';
    if (cycleNumber === 1) return 'Previous Cycle';
    return `${cycleNumber} Cycles Ago`;
  };

  // Get the date range for the selected cycle
  const getSelectedCycleDateRange = (): string => {
    if (sortedCycles.length === 0) return '';
    const cycle = getCycleWithLength(sortedCycles[selectedCycle], selectedCycle);
    const startDate = new Date(cycle.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + cycle.displayLength! - 1);
    
    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  };

  // Get phase areas for chart
  const getPhaseBoundaries = () => {
    if (sortedCycles.length === 0 || selectedCycle >= sortedCycles.length) return [];
    
    const cycle = getCycleWithLength(sortedCycles[selectedCycle], selectedCycle);
    const periodLength = cycle.periodLength;
    
    const boundaries = [
      { phase: 'Menstruation', start: 1, end: periodLength, color: 'rgba(248, 113, 113, 0.1)' }
    ];
    
    if (periodLength < 13) {
      boundaries.push({ phase: 'Follicular', start: periodLength + 1, end: 13, color: 'rgba(250, 204, 21, 0.1)' });
    }
    
    if (cycle.displayLength! >= 14) {
      boundaries.push({ phase: 'Ovulation', start: 14, end: 14, color: 'rgba(34, 197, 94, 0.1)' });
    }
    
    if (cycle.displayLength! > 14) {
      boundaries.push({ phase: 'Luteal', start: 15, end: cycle.displayLength!, color: 'rgba(96, 165, 250, 0.1)' });
    }
    
    return boundaries;
  };

  return {
    sortedCycles,
    getCycleWithLength,
    getCycleInfo,
    getEventsForCycle,
    calculateNextPeriod,
    prepareChartData,
    getCyclePhase,
    calculateStats,
    getMaxYValue,
    formatCycleDisplay,
    getSelectedCycleDateRange,
    getPhaseBoundaries
  };
}; 