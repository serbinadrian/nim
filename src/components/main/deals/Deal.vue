/* Для файла lang
  {
    "to": "To",
    "description": "Description",
    "confirm": "Confirm",
    "confirmed": "Confirmed",
    "submit": "Submit",
    "submitted": "Submitted",
    "inProgress": "In progress",
    "cancel": "Cancel",
    "cancelled": "Cancelled"
  }
*/

<template>
  <div class="deal" @click="active = !active">
    <template v-if="displayAs === 'customer'">
      <div 
        :class="statusToClass"
        class="deal__status">
        {{ statusToPrint }}
      </div>
      <div class="deal__title">{{ title }}</div>
      <div class="deal__to-price">
        <div class="deal__to">
          To: <span class="deal__to-name">{{ nameTo }}</span>
        </div>
        <div class="deal__price">{{ price }} NIM</div>
      </div>
      <transition name="expand">
        <div v-show="active">
          <div class="deal__description">
            <div class="deal__description-title">Description:</div>
            <div class="deal__description-content">
              {{ description }}
            </div>
          </div>
          <div class="deal__controls">
            <button
              :disabled="status === dealStatus.CONFIRMED"
              @click.stop="status = dealStatus.CONFIRMED"
              class="deal__control deal__confirm">
              Confirm
            </button>
            <button
              :disabled="status === dealStatus.CANCELLED"
              @click.stop="status = dealStatus.CANCELLED"
              class="deal__control deal__cancel">
              Cancel
            </button>
          </div>
        </div>
      </transition>
    </template>
    <template v-else-if="displayAs === 'executor'">
      <div
        :class="statusToClass"
        class="deal__status">
        {{ statusToPrint }}
      </div>
      <div class="deal__title">{{ title }}</div>
      <div class="deal__to-price">
        <div class="deal__to">
          To: <span class="deal__to-name">{{ nameTo }}</span>
        </div>
        <div class="deal__price">{{ price }} NIM</div>
      </div>
      <transition name="expand">
        <div v-show="active">
          <div class="deal__description">
            <div class="deal__description-title">Description:</div>
            <div class="deal__description-content">
              {{ description }}
            </div>
          </div>
          <div class="deal__controls">
            <button
              :disabled="status === dealStatus.SUBMITTED"
              @click.stop="status = dealStatus.SUBMITTED"
              class="deal__control deal__submit">
              Submit
            </button>
            <button
              :disabled="status === dealStatus.IN_PROGRESS"
              @click.stop="status = dealStatus.IN_PROGRESS"
              class="deal__control deal__in-progress">
              In progress
            </button>
            <button
              :disabled="status === dealStatus.CANCELLED"
              @click.stop="status = dealStatus.CANCELLED"
              class="deal__control deal__cancel">
              Cancel
            </button>
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script>
export default {
  name: "Deal",

  props: {
    displayAs: String,
    title: String,
    nameTo: String,
    price: Number,
    description: String,
    currentStatus: String,
    dealStatus: Object
  },

  data() {
    return {
      status: this.currentStatus,
      active: false,
    };
  },
  
  computed: {
    statusToClass() {
      return this.status.replace(' ', '-').toLowerCase() || '';
    },
    statusToPrint() {
      if (this.status === '')
        return '';

      return this.status[0].toUpperCase() + this.status.slice(1);
    }
  }
}
</script>

<style scoped>
.deal {
  position: relative;
  padding: 20px 24px 20px 36px;
  background-color: var(--olive-tinted);
  border-radius: 30px;
  box-shadow: 0 0 4px rgba(0,0,0,.5);
  cursor: pointer;
}

.deal:not(:last-child) {
  margin-bottom: 28px;
}

.deal__status {
  position: absolute;
  top: 20px;
  right: 24px;
  padding: 0.35em 0;
  min-width: 7em;
  text-align: center;
  font-weight: 600;
  font-size: 11px;
  line-height: 1;
  border-radius: 50px;
  color: #fff;  
}

.deal__control.deal__confirm,
.deal__status.confirmed {
  background-color: var(--dark-context);
}

.deal__control.deal__cancel,
.deal__status.cancelled {
  background-color: var(--red-custom);
}

.deal__control.deal__submit,
.deal__status.submitted {
  background-color: var(--dark-context);
}

.deal__control.deal__in-progress,
.deal__status.in-progress {
  background-color: var(--olive-dark);
}

.deal__title {
  font-size: 24px;
  padding-right: 80px;
  margin-bottom: 1em;
  font-weight: bold;
  color: var(--dark-context);
}

.deal__to-price {
  margin-bottom: 1em;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.deal__to {
  font-size: 18px;
  font-weight: bold;
  color: var(--dark-context);
}

.deal__to-name,
.deal__price {
  font-size: 24px;
  font-weight: bold;
  color: var(--asphalt-solid);
}

.deal__price {
  flex-shrink: 0;
}

.deal__description {
  font-size: 16px;
  font-weight: bold;
}

.deal__description-title {
  color: var(--dark-context);
  margin-bottom: 1em;
}

.deal__description-content {
  color: var(--asphalt-solid);
}

.deal__controls {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-top: 1.2em;
}

.deal__control {
  padding: 0.4em 0;
  min-width: 7.5em;
  line-height: 1;
  font-weight: 600;
  border: none;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
}

.deal__control:hover {
  opacity: 0.9;
}

.deal__control:disabled {
  opacity: 0.6;
}




/*-----transitions-----*/
.expand-enter {
  opacity: 0;
  max-height: 0;
}

.expand-enter-active {
  transition-property: max-height, opacity;
  transition-duration: .5s, .25s;
  transition-delay: 0s, .25s;
  transition-timing-function: ease-in-out;
}

.expand-enter-to, .expand-leave {
  opacity: 1;
  max-height: 500px;
}

.expand-leave-active {
  transition-property: max-height, opacity;
  transition-duration: .5s, .25s;
  transition-delay: .0s, 0s;
  transition-timing-function: ease-in-out;
}

.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>