<template>
  <div @click.stop class="modal__content">
    <h2 class="modal__header">Create a deal</h2>
    <form action="#" class="modal__form">
      <div class="modal__row">
        <fieldset class="modal__cell">
          <label for="modal__executor-address">Executor</label>
          <input id="modal__executor-address" class="input" v-model="dealObject.executor" type="text">
        </fieldset>
      </div>
      <div class="modal__row right">
        <svg @click="swapCustomerAndExecutor()" class="icon" width="25" height="25" viewBox="0 0 40 28" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(90deg)">
          <path d="M14.02 18H0V22H14.02V28L22 20L14.02 12V18ZM25.98 16V10H40V6H25.98V0L18 8L25.98 16Z" />
        </svg>
      </div>
      <div class="modal__row">
        <fieldset class="modal__cell">
          <label for="modal__customer-address">Customer</label>
          <input id="modal__customer-address" class="input" v-model="dealObject.customer" type="text">
        </fieldset>
      </div>
      <div class="modal__row">
        <fieldset class="modal__cell">
          <label for="modal__name">Title</label>
          <input id="modal__name" class="input" v-model="dealObject.name" type="text">
        </fieldset>
        <fieldset class="modal__cell">
          <label for="modal__deposit">Deposit</label>
          <input id="modal__deposit" class="input" v-model="dealObject.deposit" type="number" step="any">
        </fieldset>
      </div>
      <div class="modal__row">
        <fieldset class="modal__cell">
          <label for="modal__deadline">Deadline</label>
          <input id="modal__deadline" class="input" v-model="dealObject.deadline" type="datetime-local">
        </fieldset>
      </div>
      <div class="modal__row">
        <fieldset class="modal__cell">
          <label for="modal__description">Description</label>
          <textarea id="modal__description" class="input" v-model="dealObject.description" name="" rows="10"></textarea>
        </fieldset>
      </div>
      <div class="modal__row">
        <fieldset class="modal__cell">
          <button class="button" @click="createDeal()">Create a deal</button>
        </fieldset>
      </div>
    </form>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
//import dealStatus from "@/data/status/dealStatus.json";

export default {
  name: "CreateDeal",
  data(){
    return {
      dealObject: {
        name: '',
        executor: '',
        customer: '',
        deposit: 0,
        deadline: Date.now(),
        description: ''
      }
    }
  },
  created() {
    this.dealObject.customer = this.currentUser.username;
    this.dealObject.executor = this.roomMate;
  },
  computed: {
    ...mapState(['currentUser', 'roomMate', 'modals', 'backendUrl'])
  },
  methods: {
    ...mapMutations(['setDisplayModalAs']),
    recordState(){
      // eslint-disable-next-line no-console
      console.log(this.dealObject);
    },
    swapCustomerAndExecutor(){
      let temp = this.dealObject.executor;
      // eslint-disable-next-line no-console
      console.log(temp);
      this.dealObject.executor = this.dealObject.customer;
      this.dealObject.customer = temp;
    },
    createDeal() {
      fetch(this.backendUrl + `/api/v1/escrow`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this.currentUser.accessToken,
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(this.dealObject)
      })
      .then(() => {
          this.$emit('close');
        })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    }
  }
}
</script>

<style scoped>
  .modal__content {
    margin: 0 auto;
    padding: 50px 50px 30px;
    width: 700px;
    border-radius: 30px;
    background-color: var(--secondary-color);
  }

  .modal__header {
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 30px;
    color: var(--secondary-font-color);
  }

  .modal__form {
    
  }

  .modal__row {
    display: flex;
    gap: 20px;
    margin-bottom: 10px;
  }

  .modal__cell {
    flex: 1;
  }

  .modal__cell label,
  .modal__cell input,
  .modal__cell textarea {
    display: block;
    width: 100%;
  }

  .modal__cell label {
    font-size: 1.6rem;
    font-weight: 600;
    margin-left: 20px;
    margin-bottom: 5px;
    color: var(--secondary-font-color);
  }

  .modal__cell input,
  .modal__cell textarea {
    padding: 12px 20px;
    font-family: inherit;
    font-size: 1.6rem;
    line-height: 1;
    font-weight: 400;
    border: none;
    border-radius: 30px;
  }

  .modal__cell input::-webkit-outer-spin-button,
  .modal__cell input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }

  .modal__cell input[type=number] {
    -moz-appearance: textfield;
  }

  .modal__cell textarea {
    resize: none;
  }

  .modal__cell button {
    display: block;
    margin: 50px auto 0;
    padding: 11px 30px;
    font-size: 1.8rem;
    line-height: 1;
    font-weight: 600;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    user-select: none;
  }

  .modal{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }

  .right{
    z-index: 90;
    display: flex;
    justify-content: end;
    cursor: pointer;
  }

  .right svg{
    position: absolute;
  }
</style>