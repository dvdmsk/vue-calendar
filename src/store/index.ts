import { createStore } from 'vuex'

export interface CalendarEvent {
  id: string
  title: string
  start: string
  end?: string
}

interface State {
  events: CalendarEvent[]
}

export default createStore<State>({
  state: {
    events: [],
  },
  mutations: {
    setEvents(state, events: CalendarEvent[]) {
      state.events = events
    },
    addEvent(state, event: CalendarEvent) {
      state.events.push(event)
    },
    updateEvent(state, updated: CalendarEvent) {
      const index = state.events.findIndex(e => e.id === updated.id)
      if (index !== -1) state.events[index] = updated
    },
    deleteEvent(state, id: string) {
      state.events = state.events.filter(e => e.id !== id)
    },
  },
})
