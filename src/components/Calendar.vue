<script setup lang="ts">
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";

import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  DateClickArg,
  EventDragStopArg,
} from "@fullcalendar/interaction";
import type { EventClickArg, EventDropArg } from "@fullcalendar/core";
import listPlugin from "@fullcalendar/list";

import { useStore } from "vuex";
import { computed, nextTick, onMounted, ref } from "vue";
import type { CalendarEvent } from "@/store";
import EventModal from "./EventModal.vue";

const store = useStore();

const events = computed(() => store.state.events);

const calendarRef = ref<InstanceType<typeof FullCalendar> | null>(null);
const calendarApi = computed(() => calendarRef.value?.getApi());

const calendarTitle = ref("");
const activeView = ref("dayGridMonth");
const lastNavAction = ref("today");

function goToPrev() {
  calendarApi.value?.prev();
  lastNavAction.value = "prev";
  updateTitle();
}
function goToNext() {
  calendarApi.value?.next();
  lastNavAction.value = "next";
  updateTitle();
}
function goToToday() {
  calendarApi.value?.today();
  lastNavAction.value = "today";
  updateTitle();
}

function changeView(viewName: string) {
  calendarApi.value?.changeView(viewName);
  activeView.value = viewName;
  updateTitle();
}
function updateTitle() {
  calendarTitle.value = calendarApi.value?.view?.title || "";
}

onMounted(() => {
  updateTitle();
});

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
  initialView: "dayGridMonth",
  editable: true,
  selectable: true,
  eventClick: handleEventClick,
  dateClick: handleDateClick,
  eventDrop: handleEventDrop,
  events: events.value,
  headerToolbar: false as const,
}));

const showModal = ref(false);
const modalX = ref(0);
const modalY = ref(0);
const modalEventData = ref<any>(null);

function handleDateClick(arg: DateClickArg) {
  modalEventData.value = {
    title: "",
    date: "",
    time: "",
    notes: "",
  };
  openModalAt(arg.jsEvent);
}

function handleEventClick(arg: EventClickArg) {
  const event = arg.event;
  modalEventData.value = {
    id: event.id,
    title: event.title,
    date: event.startStr.slice(0, 10),
    time: event.startStr.slice(11, 16),
    notes: event.extendedProps.notes || "",
  };
  console.log(arg);
  openModalAt(arg.jsEvent);
}

function openModalAt(event: MouseEvent) {
  if (document.querySelector(".event-modal")) {
    return;
  }

  const calendarElement = document.querySelector(".calendar") as HTMLElement;
  const modalWidth = 201;
  const calendarRect = calendarElement?.getBoundingClientRect();
  const targetCell = (event.target as HTMLElement).closest(
    "td, .fc-daygrid-day-frame"
  ) as HTMLElement;

  const cellRect = targetCell?.getBoundingClientRect();
  const main = document.querySelector(".main") as HTMLElement;
  const margin = 10;

  let x = event.clientX;
  let y = event.clientY;

  if (cellRect && calendarRect) {
    const cellWidth = cellRect.width;
    x = cellRect.left - (modalWidth - cellWidth) / 2;
    y = cellRect.top + cellRect.height + 10;
  }

  modalX.value = x;
  modalY.value = y + window.scrollY;
  showModal.value = true;
  const bottomMain = main.getBoundingClientRect().top + main.offsetHeight + window.scrollY;

  nextTick(() => {
    const modal = document.querySelector(".event-modal") as HTMLElement;

    if (modal && main) {
      const bottomModal =
        modal.getBoundingClientRect().top + modal.offsetHeight + window.scrollY;
      const delta = bottomModal - bottomMain;

      main.style.height = (delta > 0) ? `${main.offsetHeight + delta}px` : '100%';
    }
  });
}

function handleModalSave(payload: any) {
  const event = {
    id: payload.id || Date.now().toString(),
    title: payload.title,
    start: `${payload.date}T${payload.time || "00:00"}`,
    notes: payload.notes,
  };

  if (payload.id) {
    store.commit("updateEvent", event);
  } else {
    store.commit("addEvent", event);
  }

  showModal.value = false;
}

function handleModalDelete(id: string) {
  store.commit("deleteEvent", id);
  showModal.value = false;
}

function handleModalCancel() {
  showModal.value = false;
}

function handleEventDrop(arg: EventDropArg) {
  const event = arg.event;
  const updated: CalendarEvent = {
    id: event.id,
    title: event.title,
    start: event.startStr,
    end: event.endStr || undefined,
  };
  store.commit("updateEvent", updated);
}
</script>

<template>
  <div class="calendar">
    <div class="calendar__toolbar">
      <div class="calendar__top">
        <p class="calendar__text">Calendar View</p>
        <div class="calendar__views">
          <button
            @click="changeView('dayGridMonth')"
            :class="[
              'calendar__button',
              { 'calendar__button--active': activeView === 'dayGridMonth' },
            ]"
          >
            Month
          </button>
          <button
            @click="changeView('timeGridWeek')"
            :class="[
              'calendar__button',
              { 'calendar__button--active': activeView === 'timeGridWeek' },
            ]"
          >
            Week
          </button>
          <button
            @click="changeView('timeGridDay')"
            :class="[
              'calendar__button',
              { 'calendar__button--active': activeView === 'timeGridDay' },
            ]"
          >
            Day
          </button>
          <button
            @click="changeView('listWeek')"
            :class="[
              'calendar__button',
              { 'calendar__button--active': activeView === 'listWeek' },
            ]"
          >
            Agenda
          </button>
        </div>
      </div>
      <div class="calendar__navigation">
        <div class="calendar__buttons-wrapper">
          <div class="calendar__buttons">
            <button
              @click="goToPrev"
              :class="[
                'calendar__button',
                { 'calendar__button--active': lastNavAction === 'prev' },
              ]"
            >
              Prev
            </button>
            <button
              @click="goToNext"
              :class="[
                'calendar__button',
                { 'calendar__button--active': lastNavAction === 'next' },
              ]"
            >
              Next
            </button>
            <button
              @click="goToToday"
              :class="[
                'calendar__button',
                { 'calendar__button--active': lastNavAction === 'today' },
              ]"
            >
              Today
            </button>
          </div>
        </div>
        <div class="calendar__title">{{ calendarTitle }}</div>
      </div>
    </div>

    <FullCalendar ref="calendarRef" :options="calendarOptions" />

    <EventModal
      v-if="showModal"
      :eventData="modalEventData"
      :x="modalX"
      :y="modalY"
      @save="handleModalSave"
      @cancel="handleModalCancel"
      @delete="handleModalDelete"
    />
  </div>
</template>
