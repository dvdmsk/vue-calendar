<script setup lang="ts">
import { computed, reactive, toRefs, watch } from "vue";
import CloseIco from "./icons/CloseIco.vue";
import FormCalendarIco from "./icons/FormCalendarIco.vue";
import ClockIco from "./icons/ClockIco.vue";
import TriangleIco from "./icons/TriangleIco.vue";

interface Props {
  eventData?: {
    id?: string;
    title: string;
    date: string;
    time?: string;
    notes?: string;
  };
  x: number;
  y: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["save", "cancel", "delete"]);

const isEdit = !!props.eventData?.id;

const localEvent = reactive({
  id: props.eventData?.id || "",
  title: props.eventData?.title || "",
  date: props.eventData?.date || null,
  time: props.eventData?.time || null,
  notes: props.eventData?.notes || "",
});

function onSubmit() {
  emit("save", { ...localEvent });
}

const isDateFilled = computed(() => {
  return (
    !!localEvent.date &&
    localEvent.date !== "" &&
    !localEvent.date.startsWith("0000")
  );
});

const isTimeFilled = computed(() => {
  return (
    !!localEvent.time && localEvent.time !== "--:--" && localEvent.time !== ""
  );
});

function close() {
  emit("cancel");

  const modal = document.querySelector(".event-modal") as HTMLElement;
  const main = document.querySelector(".main") as HTMLElement;

  if (modal && main) {
    main.style.height = `100%`;
  }
}
</script>

<template>
  <div class="event-modal__backdrop" @click.self="close">
    <div class="event-modal" :style="{ top: `${y}px`, left: `${x}px` }">
      <div class="event-modal__triangle">
        <TriangleIco :is-filled="!isEdit" />
      </div>
      <button class="event-modal__close" @click="close">
        <CloseIco />
      </button>

      <form @submit.prevent="onSubmit" class="event-modal__form">
        <label class="event-modal__label">
          Event Name
          <input
            v-model="localEvent.title"
            required
            class="event-modal__input"
          />
        </label>

        <label class="event-modal__label">
          Event Date
          <div class="event-modal__input-wrapper">
            <FormCalendarIco class="event-modal__icon" />
            <input
              type="date"
              v-model="localEvent.date"
              required
              :class="{ 'has-value': isDateFilled }"
              class="event-modal__input event-modal__input--with-icon"
            />
          </div>
        </label>

        <label class="event-modal__label">
          Event Time
          <div class="event-modal__input-wrapper">
            <ClockIco class="event-modal__icon" />
            <input
              type="time"
              v-model="localEvent.time"
              :class="{ 'has-value': isTimeFilled }"
              class="event-modal__input event-modal__input--with-icon"
            />
          </div>
        </label>

        <label class="event-modal__label">
          Notes
          <textarea
            v-model="localEvent.notes"
            class="event-modal__textarea"
          ></textarea>
        </label>

        <div class="event-modal__buttons">
          <button
            v-if="isEdit"
            type="button"
            @click="$emit('delete', localEvent.id)"
            class="event-modal__btn event-modal__btn--delete"
          >
            DISCARD
          </button>

          <button
            v-if="!isEdit"
            type="button"
            @click="close"
            class="event-modal__btn event-modal__btn--delete"
          >
            Cancel
          </button>

          <div class="event-modal__right-buttons">
            <button
              type="submit"
              class="event-modal__btn event-modal__btn--primary"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
