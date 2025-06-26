import React from 'react';
import { Event, Cycle } from '../types';
import EventForm from '../components/events/EventForm';
import EventList from '../components/events/EventList';

interface EventsPageProps {
  events: Event[];
  cycles: Cycle[];
  newEvent: any;
  handleEventChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  addEvent: (e: React.FormEvent) => void;
  editingEvent: Event | null;
  cancelEditEvent: () => void;
  editEvent: (event: Event) => void;
  deleteEvent: (id: number) => void;
  getCycleInfo: (date: string) => any;
  getPhaseColor: (phase: string) => string;
  getCyclePhase: (day: number, periodLength: number) => string;
  formatCycleDisplay: (n: number) => string;
  getEventIcon: (type: string) => React.ReactNode;
  getEventLabel: (type: string) => string;
}

const EventsPage: React.FC<EventsPageProps> = (props) => (
  <main role="main" aria-label="Events" className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
    <EventForm
      newEvent={props.newEvent}
      handleEventChange={props.handleEventChange}
      addEvent={props.addEvent}
      editingEvent={props.editingEvent}
      cancelEditEvent={props.cancelEditEvent}
      cycles={props.cycles}
      getCycleInfo={props.getCycleInfo}
      getPhaseColor={props.getPhaseColor}
      getCyclePhase={props.getCyclePhase}
      formatCycleDisplay={props.formatCycleDisplay}
    />
    
    <EventList
      events={props.events}
      editEvent={props.editEvent}
      deleteEvent={props.deleteEvent}
      getCycleInfo={props.getCycleInfo}
      getPhaseColor={props.getPhaseColor}
      getCyclePhase={props.getCyclePhase}
      formatCycleDisplay={props.formatCycleDisplay}
      getEventIcon={props.getEventIcon}
      getEventLabel={props.getEventLabel}
      cycles={props.cycles}
    />
  </main>
);

export default EventsPage; 