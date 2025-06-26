import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI, cyclesAPI, eventsAPI, settingsAPI } from '../services/api';
import { showToast } from '../utils/toast';

// Authentication thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: { username: string; email: string; password: string }) => {
    try {
      const response = await authAPI.register(userData);
      showToast.success('Registration successful!');
      return response.user;
    } catch (error: any) {
      showToast.error(error.message || 'Registration failed');
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    try {
      const response = await authAPI.login(credentials);
      showToast.success('Login successful!');
      return response.user;
    } catch (error: any) {
      showToast.error(error.message || 'Login failed');
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    authAPI.logout();
    showToast.success('Logged out successfully');
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async () => {
    try {
      const user = await authAPI.getCurrentUser();
      return user;
    } catch (error: any) {
      showToast.error('Failed to get user data');
      throw error;
    }
  }
);

// Cycles thunks
export const fetchCycles = createAsyncThunk(
  'cycles/fetchAll',
  async () => {
    try {
      const cycles = await cyclesAPI.getAll();
      return cycles;
    } catch (error: any) {
      showToast.error('Failed to fetch cycles');
      throw error;
    }
  }
);

export const createCycle = createAsyncThunk(
  'cycles/create',
  async (cycleData: any) => {
    try {
      const cycle = await cyclesAPI.create(cycleData);
      showToast.success('Cycle created successfully');
      return cycle;
    } catch (error: any) {
      showToast.error('Failed to create cycle');
      throw error;
    }
  }
);

export const updateCycle = createAsyncThunk(
  'cycles/update',
  async ({ id, cycleData }: { id: number; cycleData: any }) => {
    try {
      const cycle = await cyclesAPI.update(id, cycleData);
      showToast.success('Cycle updated successfully');
      return cycle;
    } catch (error: any) {
      showToast.error('Failed to update cycle');
      throw error;
    }
  }
);

export const deleteCycle = createAsyncThunk(
  'cycles/delete',
  async (id: number) => {
    try {
      await cyclesAPI.delete(id);
      showToast.success('Cycle deleted successfully');
      return id;
    } catch (error: any) {
      showToast.error('Failed to delete cycle');
      throw error;
    }
  }
);

// Events thunks
export const fetchEvents = createAsyncThunk(
  'events/fetchAll',
  async () => {
    try {
      const events = await eventsAPI.getAll();
      return events;
    } catch (error: any) {
      showToast.error('Failed to fetch events');
      throw error;
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/create',
  async (eventData: any) => {
    try {
      const event = await eventsAPI.create(eventData);
      showToast.success('Event created successfully');
      return event;
    } catch (error: any) {
      showToast.error('Failed to create event');
      throw error;
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/update',
  async ({ id, eventData }: { id: number; eventData: any }) => {
    try {
      const event = await eventsAPI.update(id, eventData);
      showToast.success('Event updated successfully');
      return event;
    } catch (error: any) {
      showToast.error('Failed to update event');
      throw error;
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'events/delete',
  async (id: number) => {
    try {
      await eventsAPI.delete(id);
      showToast.success('Event deleted successfully');
      return id;
    } catch (error: any) {
      showToast.error('Failed to delete event');
      throw error;
    }
  }
);

// Settings thunks
export const fetchSettings = createAsyncThunk(
  'settings/fetch',
  async () => {
    try {
      const settings = await settingsAPI.get();
      return settings;
    } catch (error: any) {
      showToast.error('Failed to fetch settings');
      throw error;
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/update',
  async (settingsData: any) => {
    try {
      const settings = await settingsAPI.update(settingsData);
      showToast.success('Settings updated successfully');
      return settings;
    } catch (error: any) {
      showToast.error('Failed to update settings');
      throw error;
    }
  }
); 