<template>
  <div class="deals">
    <h1 class="headline">
      Deals
    </h1>
    <div class="deals__titles">
      <h2 class="title">
        As customer
      </h2>
      <h2 class="title">
        As executor
      </h2>
    </div>
    <div class="deals__lists">
      <div class="list">
        <div 
          v-for="(deal, index) in deals.asCustomer" 
          :key="deal.title + index" 
          @click="deal.active = !deal.active" 
          :class="deal.state.trim().replace(' ', '-').toLowerCase() || ''"
          class="deal">
          <div class="deal__title">{{ deal.title }}</div>
          <div class="deal__to-price">
            <div class="deal__to">
              To: <span class="deal__to-name">{{ deal.nameTo }}</span>
            </div>
            <div class="deal__price">{{ deal.price }} NIM</div>
          </div>
          <transition name="expand">
            <div v-show="deal.active">
              <div class="deal__description">
                <div class="deal__description-title">Description:</div>
                <div class="deal__description-content">
                  {{ deal.description }}
                </div>
              </div>
              <div class="deal__controls">
                <button
                  :disabled="deal.state.toLowerCase()==='confirmed'"
                  @click.stop="deal.state = 'confirmed'"
                  class="deal__control deal__confirm">
                  Confirm
                </button>
                <button
                  :disabled="deal.state.toLowerCase() === 'cancelled'"
                  @click.stop="deal.state = 'cancelled'"
                  class="deal__control deal__cancel">
                  Cancel
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="list">
        <div 
          v-for="(deal, index) in deals.asExecutor" 
          :key="deal.title + index" 
          @click="deal.active = !deal.active" 
          :class="deal.state.trim().replace(' ', '-').toLowerCase() || ''"
          class="deal">
          <div class="deal__title">{{ deal.title }}</div>
          <div class="deal__to-price">
            <div class="deal__to">
              To: <span class="deal__to-name">{{ deal.nameTo }}</span>
            </div>
            <div class="deal__price">{{ deal.price }} NIM</div>
          </div>
          <transition name="expand">
            <div v-show="deal.active">
              <div class="deal__description">
                <div class="deal__description-title">Description:</div>
                <div class="deal__description-content">
                  {{ deal.description }}
                </div>
              </div>
              <div class="deal__controls">
                <button
                  :disabled="deal.state.toLowerCase() === 'submitted'"
                  @click.stop="deal.state = 'submitted'"
                  class="deal__control deal__submit">
                  Submit
                </button>
                <button
                  :disabled="deal.state.toLowerCase() === 'in progress'"
                  @click.stop="deal.state = 'in progress'"
                  class="deal__control deal__in-progress">
                  In progress
                </button>
                <button
                  :disabled="deal.state.toLowerCase() === 'cancelled'"
                  @click.stop="deal.state = 'cancelled'"
                  class="deal__control deal__cancel">
                  Cancel
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Deals",
  data() {
    return {
      deals: {
        asCustomer: [
          {
            title: 'Security system "Marci"',
            nameTo: 'Babbage',
            price: 14.621,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!',
            state: 'Cancelled',
            active: false
          },
          {
            title: 'Computing of bigINT',
            nameTo: 'Buterin',
            price: 0.457,
            description: 'Some description',
            state: 'Confirmed',
            active: false
          },
          {
            title: 'long long long long long long a a a a a a a a a a a a a a a a a  long long long long long long long long long long long long long ',
            nameTo: 'long long long long long long a a a a a a a a a a a a a a a a a',
            price: 7.2,
            description: 'Firstly, we need a backup for our invention to prove we did it, we created this masterpiece of techical progress. Secondly, we have to test it. Write a program for this machine, launch this one and try again until successful changes.',
            state: '',
            active: false
          }
        ],
        asExecutor: [
          {
            title: 'Security system "Marci"',
            nameTo: 'Babbage',
            price: 14.621,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!',
            state: 'In progress',
            active: false
          },
          {
            title: 'Security system "Marci"',
            nameTo: 'Babbage',
            price: 14.621,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!',
            state: 'Submitted',
            active: false
          },
          {
            title: 'Security system "Marci"',
            nameTo: 'Babbage',
            price: 14.621,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!',
            state: '',
            active: false
          },
          {
            title: 'Security system "Marci"',
            nameTo: 'Babbage',
            price: 14.621,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!',
            state: 'Cancelled',
            active: false
          }
        ]
      }
    };
  },
  methods: {
    dealActive(deal) {
      alert(deal);
    }
  }
}
</script>

<style scoped>
.deals {
  font-family: Inter, sans-serif;
  margin-left: 20px;
  flex: 1;
}

.headline {
  font-size: 48px;
  font-weight: bold;
  line-height: 1;
  margin: .3em 0 .7em;
  color: #232829;
}

.deals__titles {
  padding: 4px 4px 28px;
  overflow: auto;
  display: flex;
  gap: 30px;
}

.title {
  flex: 1;
  padding: 0.75em 1.5em;
  font-size: 24px;
  line-height: 1;
  font-weight: bold;
  border: 1px solid var(--olive-dark);
  border-radius: 50px;
  box-shadow: 0 0 4px rgba(0,0,0,.5);
}

.deals__lists {
  height: calc(100% - 96px - 92px);
  padding: 4px;
  overflow: auto;
  scrollbar-gutter: stable;
  display: flex;
  gap: 30px;
}

.list {
  flex: 1;
  /* height: 2000px; */
}

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

.deal::after {
  content: '';
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


/*-----states of deal-----*/
.deal.confirmed::after {
  content: 'Confirmed';
  background-color: var(--dark-context);
}

.deal.cancelled::after {
  content: 'Cancelled';
  background-color: var(--red-custom);
}

.deal.submitted::after {
  content: 'Submitted';
  background-color: var(--dark-context);
}

.deal.in-progress::after {
  content: 'In progress';
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

.deal__control.deal__confirm {
  background-color: var(--dark-context);
}

.deal__control.deal__cancel {
  background-color: var(--red-custom);
}
  
.deal__control.deal__submit {
  background-color: var(--dark-context);
}

.deal__control.deal__in-progress {
  background-color: var(--olive-dark);
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