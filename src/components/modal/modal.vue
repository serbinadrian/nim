<template>
  <div class="modal">
    <div class="modal__content">
      <h2 class="modal__header">Create a deal</h2>
      <form action="#" class="modal__form">
        <div class="modal__row">
          <fieldset class="modal__cell">
            <label for="modal__executor-address">Executor Address</label>
            <input id="modal__executor-address" type="text">
          </fieldset>
        </div>
        <div class="modal__row">
          <fieldset class="modal__cell">
            <label for="modal__customer-address">Customer Address</label>
            <input id="modal__customer-address" type="text">
          </fieldset>
        </div>
        <div class="modal__row">
          <fieldset class="modal__cell">
            <label for="modal__name">Name</label>
            <input id="modal__name" type="text">
          </fieldset>
          <fieldset class="modal__cell">
            <label for="modal__deposit">Deposit</label>
            <input id="modal__deposit" type="number" step="any">
          </fieldset>
        </div>
        <div class="modal__row">
          <fieldset class="modal__cell">
            <label for="modal__deadline">Deadline</label>
            <input id="modal__deadline" type="datetime-local">
          </fieldset>
        </div>
        <div class="modal__row">
          <fieldset class="modal__cell">
            <label for="modal__description">Description</label>
            <textarea id="modal__description" name="" rows="10"></textarea>
          </fieldset>
        </div>
        <div class="modal__row">
          <fieldset class="modal__cell">
            <button disabled>Create a deal</button>
          </fieldset>
        </div>
      </form>
    </div>
    <div class="modal__cross">╳</div>
  </div>
</template>

<script>
export default {
  name: "modal"
}
</script>

<style scoped>

</style>