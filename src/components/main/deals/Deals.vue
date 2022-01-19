<template>
  <div class="deals">
    <button @click="createDeal()">create</button>
    <button @click="getDeals()">get</button>
    <h1 class="headline">
      {{ language['deals'] }}
    </h1>
    <div class="deals__titles">
      <h2 class="title">
        {{ language['as customer'] }}
      </h2>
      <h2 class="title">
        {{ language['as executor'] }}
      </h2>
    </div>
    <div class="deals__lists">
      <div class="list">
        <deal 
          v-for="(deal, index) in deals.asCustomer" 
          :key="index"

          displayAs="customer"
          :title="deal.title"
          :nameTo="deal.nameTo"
          :price="deal.price"
          :description="deal.description"
          :currentStatus="deal.status"
          :dealStatus="dealStatus"
        >
        </deal>
      </div>
      <div class="list">
        <deal 
          v-for="(deal, index) in deals.asExecutor" 
          :key="index"

          displayAs="executor"
          :title="deal.title"
          :nameTo="deal.nameTo"
          :price="deal.price"
          :description="deal.description"
          :currentStatus="deal.status"
          :dealStatus="dealStatus"
        >
        </deal>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import deal from './Deal.vue'

export default {
  name: "Deals",
  components: {
    deal,
  },
  data() {
    return {
      // dealStatus: {},
    };
  },
  computed: {
    ...mapState(['components', 'dealStatus', 'languageData']),
    ...mapActions(['getDeals', 'createDeal']),
    language() {
      return this.languageData[this.components.DEALS] || {};
    },
    deals() {
      return {
        asCustomer: [
          {
            title: 'Security system "Marci"',
            nameTo: 'Babbage',
            price: 14.621,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!',
            status: this.dealStatus.CANCELLED
          },
          {
            title: 'Computing of bigINT',
            nameTo: 'Buterin',
            price: 0.457,
            description: 'Some description',
            status: this.dealStatus.CONFIRMED
          },
          {
            title: 'long long long long long long a a a a a a a a a a a a a a a a a  long long long long long long long long long long long long long ',
            nameTo: 'long long long long long long a a a a a a a a a a a a a a a a a',
            price: 7.2,
            description: 'Firstly, we need a backup for our invention to prove we did it, we created this masterpiece of techical progress. Secondly, we have to test it. Write a program for this machine, launch this one and try again until successful changes.',
            status: this.dealStatus.PENDING
          }
        ],
        asExecutor: [
          {
            title: 'Security system "Marci"',
            nameTo: 'Babbage',
            price: 14.621,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!',
            status: this.dealStatus.IN_PROGRESS
          },
          {
            title: 'Security system "Marci"',
            nameTo: 'Babbage',
            price: 14.621,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!',
            status: this.dealStatus.SUBMITTED
          },
          {
            title: 'Security system "Marci"',
            nameTo: 'Babbage',
            price: 14.621,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!',
            status: this.dealStatus.PENDING
          },
          {
            title: 'Security system "Marci"',
            nameTo: 'Babbage',
            price: 14.621,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt voluptates molestiae qui magnam perspiciatis amet reprehenderit provident? Dignissimos fuga dolor, dolorem alias sit quae accusantium optio mollitia modi esse! Nesciunt!',
            status: this.dealStatus.CANCELLED
          }
        ]
      };
    }

  },
  created() {
    // this.dealStatus = this.getDealStatus();
  },
  methods: {
    ...mapGetters(['getDealStatus']),
  }
}
</script>

<style scoped>
.deals {
  font-family: Inter, sans-serif;
  margin-left: 20px;
  flex: 1;
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
}

</style>