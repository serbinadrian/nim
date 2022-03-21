<template>
  <div class="authorization">
    <div class="authorization__pattern">
      <div 
        v-for="index of new Array(15)"
        :key="index"
        class="authorization__row"
        >
        <div
          v-for="index of new Array(15)"
          :key="index"
          class="authorization__chunk"
          >
          <svg viewBox="0 0 191 132" xmlns="http://www.w3.org/2000/svg">
            <path d="M45.9966 131.96H0.20459V0.199951H45.9966V18.344H22.2366V113.816H45.9966V131.96ZM58.6844 101V24.824H82.0124V30.008C84.7964 27.896 87.9164 26.264 91.3724 25.112C94.9244 23.96 98.6204 23.384 102.46 23.384C111.388 23.384 118.684 26.264 124.348 32.024C130.012 37.784 132.844 45.128 132.844 54.056V101H109.516V57.224C109.516 53.096 108.22 49.784 105.628 47.288C103.132 44.696 99.8204 43.4 95.6924 43.4C92.7164 43.4 90.0764 43.928 87.7724 44.984C85.4684 46.04 83.5484 47.528 82.0124 49.448V101H58.6844ZM144.988 0.199951H190.78V131.96H144.988V113.816H168.748V18.344H144.988V0.199951Z"/>
          </svg>
        </div>
      </div>
    </div>
    <component 
      :is="currentAuthorizationWindow" 
      @current-authorization-window-selected="currentAuthorizationWindowSelected"
      />
  </div>
</template>

<script>
import SignIn from "./SignIn";
import SignUp from "./SignUp";
export default {
  name: 'Authorization',
  components: {
    SignIn,
    SignUp
  },
  data() {
    return {
      currentAuthorizationWindow: "SignIn"
    };
  },
  methods: {
    currentAuthorizationWindowSelected(currentAuthorizationWindow) {
      this.currentAuthorizationWindow = currentAuthorizationWindow;
    }
  }
}
</script>

<style>
   .authorization {
    width: 100%;
    height: 100%;
    background-color: var(--primary-color);
    /* background-image: url('../../../public/img/authorization.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: left 10% bottom; */
  }



  .authorization__pattern {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-25%, -25%) rotate(-38deg);
    overflow: hidden;
    white-space: nowrap;
  }

  .authorization__row {
    margin-bottom: 20px;
    position: relative;
    left: 0;
    will-change: left;

    --width-of-el: 200px;
    --side-margins-of-el: 10px;

    --width-of-el-and-margins: calc(var(--width-of-el) + 2 * var(--side-margins-of-el));
    --half-width-of-el-and-margins: calc(var(--width-of-el-and-margins) / 2);
    --one-and-a-half-width-of-el-and-margins: calc(var(--width-of-el-and-margins) * 1.5);

    --animation-duration: 15s;
    --animation-timing-function: linear;
  }
    
  .authorization__row:nth-child(2n - 1) {
    /* animation: spin var(--animation-duration) infinite var(--animation-timing-function); */
  }
    
  .authorization__row:nth-child(2n) {
    left: var(--one-and-a-half-width-of-el-and-margins);
    /* animation: spin-reverse var(--animation-duration) infinite var(--animation-timing-function); */
  }

  @keyframes spin {
    to {
      left: var(--width-of-el-and-margins);
    }
  }

  @keyframes spin-reverse {
    to {
      left: var(--half-width-of-el-and-margins);
    }
  }

  .authorization__chunk {
    display: inline-block;
    margin: 0 var(--side-margins-of-el);
  }

  .authorization__chunk svg {
    width: var(--width-of-el);
    fill: var(--secondary-font-color);
    filter: opacity(.25);
  }



  .authorization__form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 550px;
    height: 100%;
    padding: 90px 0;
    box-sizing: border-box;
    background-color: var(--authorization-wrapper-background-color);
  }

  .authorization__logo {
    font-family: 'Red Hat Display';
    font-style: normal;
    font-weight: 900;
    font-size: 60px;
    color: var(--secondary-font-color);
    line-height: 1.333;
    letter-spacing: 0.07em;
    margin: 0 0 60px;
    user-select: none;
  }

  .form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    width: 65%;
  }

  .form__email,
  .form__login,
  .form__password,
  .form__submit {
    font-family: inherit;
    font-size: 20px;
    padding: 10px 30px;
    border-radius: 100px;
    border: none;
  }

  .form__submit {
    text-transform: uppercase;
  }

  .form__email,
  .form__password {
    margin-top: 24px;
  }

  .form__message {
    align-self: center;
    margin-top: 10px;
    color: brown;
    font-size: 18px;
    height: 40px;
  }

  .form__actions {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  .form__signup-text {
    margin-top: 5px;
    font-size: 18px;
    color: var(--secondary-sub-font-color);
    user-select: none;
  }

  .form__signup-link {
    color: inherit;
    background: none;
    border: none;
    text-decoration: underline;
    transition-property: color, opacity;
    transition-duration: .1s, .25s;
    transition-timing-function: ease-out;
  }

  .form__signup-link:not(:disabled):hover,
  .form__signup-link:not(:disabled):focus {
    cursor: pointer;
    color: var(--primary-font-color);
    outline: none;
    transition-duration: 0s;
  }

  .form__signup-link:disabled {
    opacity: .75;
    cursor: pointer;
  }
  
  .not-validated, 
  .weak {
    outline: 2px solid brown !important;
  }
</style>
