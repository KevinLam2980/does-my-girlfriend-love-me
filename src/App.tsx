import { Heart, AlertCircle, Coffee, Check, X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { TooltipProps } from './types';
import { showToast } from './utils/toast';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { useAppLogic } from './hooks/useAppLogic';
import {
  addEvent,
  updateEvent,
  deleteEvent,
  setEditingEvent,
  setNewEvent,
  cancelEditEvent
} from './store/slices/eventsSlice';
import {
  addCycle,
  updateCycle,
  deleteCycle,
  setSelectedCycle,
  setShowAddCycle,
  setEditingCycle,
  setNewCycle,
  cancelEditCycle
} from './store/slices/cyclesSlice';
import {
  updateDefaultCycleData
} from './store/slices/settingsSlice';
import {
  setCurrentTab,
  setSummaryView,
  setConfirmDialog
} from './store/slices/uiSlice';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Navigation from './components/common/Navigation';
import ConfirmDialogComponent from './components/common/ConfirmDialog';
import DashboardPage from './pages/DashboardPage';
import CyclePage from './pages/CyclePage';
import EventsPage from './pages/EventsPage';
import ProfilePage from './pages/ProfilePage';

// Main App Component
export default function App() {
  const dispatch = useAppDispatch();
  
  // Redux state
  const { currentTab, summaryView, confirmDialog } = useAppSelector((state: any) => state.ui);
  const { cycles, selectedCycle, showAddCycle, editingCycle, newCycle } = useAppSelector((state: any) => state.cycles);
  const { events, editingEvent, newEvent } = useAppSelector((state: any) => state.events);
  const { defaultCycleData } = useAppSelector((state: any) => state.settings);

  // Business logic hook
  const {
    sortedCycles,
    getCycleWithLength,
    getCycleInfo,
    calculateNextPeriod,
    prepareChartData,
    getCyclePhase,
    calculateStats,
    formatCycleDisplay,
    getSelectedCycleDateRange,
    getPhaseBoundaries
  } = useAppLogic();

  // Event handlers
  const handleDefaultCycleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateDefaultCycleData({
      [name]: parseInt(value)
    }));
    showToast.success('Settings updated successfully');
  };

  const handleEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    dispatch(setNewEvent({
      [name]: value
    }));
  };

  const handleNewCycleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setNewCycle({
      [name]: value
    }));
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!newEvent.date) {
      showToast.error('Please select a date');
      return;
    }
    
    if (!newEvent.type) {
      showToast.error('Please select an event type');
      return;
    }
    
    if (editingEvent) {
      // Update existing event
      dispatch(updateEvent({
        ...newEvent,
        id: editingEvent.id
      }));
      showToast.success('Event updated successfully');
    } else {
      // Add new event
      const eventWithId = {
        ...newEvent,
        id: Date.now()
      };
      dispatch(addEvent(eventWithId));
      showToast.success('Event added successfully');
    }
  };

  const handleEditEvent = (event: any) => {
    dispatch(setEditingEvent(event));
  };

  const handleCancelEditEvent = () => {
    dispatch(cancelEditEvent());
    showToast.info('Edit cancelled');
  };

  const handleAddCycle = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!newCycle.startDate) {
      showToast.error('Please select a start date');
      return;
    }
    
    if (!newCycle.periodLength || newCycle.periodLength < 1) {
      showToast.error('Please enter a valid period length');
      return;
    }
    
    if (editingCycle) {
      // Update existing cycle
      dispatch(updateCycle({
        ...newCycle,
        id: editingCycle.id,
        periodLength: parseInt(newCycle.periodLength.toString())
      }));
      showToast.success('Cycle updated successfully');
    } else {
      // Add new cycle
      const cycleWithId = {
        ...newCycle,
        id: Date.now(),
        periodLength: parseInt(newCycle.periodLength.toString())
      };
      dispatch(addCycle(cycleWithId));
      showToast.success('Cycle added successfully');
    }
  };

  const handleEditCycle = (cycle: any) => {
    dispatch(setEditingCycle(cycle));
  };

  const handleCancelEditCycle = () => {
    dispatch(cancelEditCycle());
    showToast.info('Edit cancelled');
  };

  const handleDeleteEvent = (id: number) => {
    const event = events.find((e: any) => e.id === id);
    if (!event) {
      showToast.error('Event not found');
      return;
    }
    
    const eventLabel = getEventLabel(event.type);
    const eventDate = new Date(event.date).toLocaleDateString();
    
    dispatch(setConfirmDialog({
      title: 'Delete Event',
      message: `Are you sure you want to delete this event?\n\n${eventLabel} on ${eventDate}${event.notes ? '\nNotes: ' + event.notes : ''}`,
      onConfirm: () => {
        dispatch(deleteEvent(id));
        dispatch(setConfirmDialog(null));
        showToast.success('Event deleted successfully');
      },
      onCancel: () => dispatch(setConfirmDialog(null))
    }));
  };

  const handleDeleteCycle = (id: number) => {
    const cycle = cycles.find((c: any) => c.id === id);
    if (!cycle) {
      showToast.error('Cycle not found');
      return;
    }
    
    const cycleDate = new Date(cycle.startDate).toLocaleDateString();
    
    dispatch(setConfirmDialog({
      title: 'Delete Cycle',
      message: `Are you sure you want to delete this cycle?\n\nPeriod starting ${cycleDate} (${cycle.periodLength} days)\n\nThis will also affect any events associated with this cycle.`,
      onConfirm: () => {
        dispatch(deleteCycle(id));
        dispatch(setConfirmDialog(null));
        showToast.success('Cycle deleted successfully');
      },
      onCancel: () => dispatch(setConfirmDialog(null))
    }));
  };

  // Calculate days until next period
  const nextPeriod = calculateNextPeriod();
  const daysUntilNextPeriod = nextPeriod ? Math.ceil((nextPeriod.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;

  // Get today's cycle info
  const todayInfo = getCycleInfo(new Date().toISOString().split('T')[0]);
  const todayPhase = todayInfo.cycle ? getCyclePhase(todayInfo.cycleDay!, todayInfo.cycle.periodLength) : 'Unknown';

  const chartData = prepareChartData(selectedCycle);
  const statsAll = calculateStats();
  const statsCurrent = calculateStats(selectedCycle);
  const stats = summaryView === 'current' ? statsCurrent : statsAll;

  // Render the icons for event types
  const getEventIcon = (type: string) => {
    switch(type) {
      case 'nice': return <Heart className="text-pink-500" />;
      case 'mean': return <AlertCircle className="text-red-500" />;
      case 'argument': return <X className="text-orange-500" />;
      case 'gift': return <Coffee className="text-purple-500" />;
      case 'food': return <Check className="text-green-500" />;
      default: return null;
    }
  };

  const getEventLabel = (type: string): string => {
    switch(type) {
      case 'nice': return 'Was Nice';
      case 'mean': return 'Was Mean';
      case 'argument': return 'Had Argument';
      case 'gift': return 'Gave Gift';
      case 'food': return 'Bought Food';
      default: return type;
    }
  };

  const getPhaseColor = (phase: string): string => {
    switch(phase) {
      case 'Menstruation': return 'bg-red-100 text-red-800';
      case 'Follicular': return 'bg-yellow-100 text-yellow-800';
      case 'Ovulation': return 'bg-green-100 text-green-800';
      case 'Luteal': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Custom tooltip formatter
  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length && sortedCycles.length > 0) {
      const cycle = getCycleWithLength(sortedCycles[selectedCycle], selectedCycle);
      const phase = getCyclePhase(typeof label === 'number' ? label : 0, cycle.periodLength);
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium">Day {label} <span className="text-xs">({phase})</span></p>
          {payload.map((entry, index) => (
            entry.value > 0 && (
              <p key={`item-${index}`} style={{ color: entry.color }}>
                {entry.name}: {entry.value}
              </p>
            )
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation tab={currentTab} setTab={(tab) => dispatch(setCurrentTab(tab))} />
      
      {/* Main Content */}
      <main 
        className="container mx-auto p-2 sm:p-4 px-2 sm:px-4 lg:px-6" 
        role="main"
        aria-labelledby="app-title"
      >
        {currentTab === 'dashboard' && (
          <DashboardPage
            cycles={cycles}
            events={events}
            sortedCycles={sortedCycles}
            selectedCycle={selectedCycle}
            setSelectedCycle={(cycle) => dispatch(setSelectedCycle(cycle))}
            chartData={chartData}
            stats={stats}
            summaryView={summaryView}
            setSummaryView={(view) => dispatch(setSummaryView(view))}
            todayInfo={todayInfo}
            todayPhase={todayPhase}
            daysUntilNextPeriod={daysUntilNextPeriod}
            nextPeriod={nextPeriod}
            formatCycleDisplay={formatCycleDisplay}
            getSelectedCycleDateRange={getSelectedCycleDateRange}
            getPhaseColor={getPhaseColor}
            getPhaseBoundaries={getPhaseBoundaries}
            CustomTooltip={CustomTooltip}
            getEventIcon={getEventIcon}
            getEventLabel={getEventLabel}
            setTab={(tab) => dispatch(setCurrentTab(tab))}
          />
        )}
        
        {currentTab === 'cycle' && (
          <CyclePage
            cycles={cycles}
            sortedCycles={sortedCycles}
            nextPeriod={nextPeriod}
            daysUntilNextPeriod={daysUntilNextPeriod}
            editingCycle={editingCycle}
            showAddCycle={showAddCycle}
            newCycle={newCycle}
            handleNewCycleChange={handleNewCycleChange}
            addCycle={handleAddCycle}
            cancelEditCycle={handleCancelEditCycle}
            editCycle={handleEditCycle}
            deleteCycle={handleDeleteCycle}
            setShowAddCycle={(show) => dispatch(setShowAddCycle(show))}
            defaultCycleData={defaultCycleData}
            getCycleWithLength={getCycleWithLength}
          />
        )}
        
        {currentTab === 'events' && (
          <EventsPage
            events={events}
            cycles={cycles}
            newEvent={newEvent}
            handleEventChange={handleEventChange}
            addEvent={handleAddEvent}
            editingEvent={editingEvent}
            cancelEditEvent={handleCancelEditEvent}
            editEvent={handleEditEvent}
            deleteEvent={handleDeleteEvent}
            getCycleInfo={getCycleInfo}
            getPhaseColor={getPhaseColor}
            getCyclePhase={getCyclePhase}
            formatCycleDisplay={formatCycleDisplay}
            getEventIcon={getEventIcon}
            getEventLabel={getEventLabel}
          />
        )}
        
        {currentTab === 'profile' && (
          <ProfilePage
            defaultCycleData={defaultCycleData}
            handleDefaultCycleChange={handleDefaultCycleChange}
          />
        )}
      </main>
      
      <Footer />
      
      {/* Custom Confirmation Dialog */}
      <ConfirmDialogComponent
        open={!!confirmDialog}
        title={confirmDialog?.title || ''}
        message={confirmDialog?.message || ''}
        onConfirm={confirmDialog?.onConfirm || (() => {})}
        onCancel={confirmDialog?.onCancel || (() => {})}
      />
      
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            zIndex: 9999,
          },
        }}
      />
    </div>
  );
}