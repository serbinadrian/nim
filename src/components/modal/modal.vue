<template>
  <div class="modal">
    <div class="modal__content">
      <h2 class="modal__header">Create a deal</h2>
      <form action="#" class="modal__form">
        <div class="modal__row">
          <fieldset class="modal__cell">
            <label for="modal__executor-address">Executor Address</label>
            <input id="modal__executor-address" v-model="transferObject.executorAddress" type="text">
          </fieldset>
        </div>
        <div class="modal__row">
          <fieldset class="modal__cell">
            <label for="modal__customer-address">Customer Address</label>
            <input id="modal__customer-address" v-model="transferObject.customerAddress" type="text">
          </fieldset>
        </div>
        <div class="modal__row">
          <fieldset class="modal__cell">
            <label for="modal__name">Name</label>
            <input id="modal__name" v-model="transferObject.name" type="text">
          </fieldset>
          <fieldset class="modal__cell">
            <label for="modal__deposit">Deposit</label>
            <input id="modal__deposit" v-model="transferObject.deposit" type="number" step="any">
          </fieldset>
        </div>
        <div class="modal__row">
          <fieldset class="modal__cell">
            <label for="modal__deadline">Deadline</label>
            <input id="modal__deadline" v-model="transferObject.deadline" type="datetime-local">
          </fieldset>
        </div>
        <div class="modal__row">
          <fieldset class="modal__cell">
            <label for="modal__description">Description</label>
            <textarea id="modal__description" v-model="transferObject.description" name="" rows="10"></textarea>
          </fieldset>
        </div>
        <div class="modal__row">
          <fieldset class="modal__cell">
            <button @click="setTransferObject(transferObject)">Create a deal</button>
          </fieldset>
        </div>
      </form>
    </div>
    <div class="modal__cross" @click="setModalVisibility(false), recordState()">╳</div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "modal",
  computed: {
    ...mapState(['transferObject'])
  },
  methods: {
    ...mapMutations(['setModalVisibility', 'setTransferObject']),
    recordState(){
      // eslint-disable-next-line no-console
      console.log(this.transferObject);
    }
  }
}
</script>

<style scoped>
  .modal{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
</style>