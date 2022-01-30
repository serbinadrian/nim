<template>
  <div class="deals">
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
          v-for="(deal, index) in deals.customer"
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
          v-for="(deal, index) in deals.executor"
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
import {mapState} from 'vuex'
import deal from './Deal.vue'

export default {
  name: "Deals",
  components: {
    deal,
  },
  data() {
    return {
      deals: {
        customer: [],
        executor: []
      }
    };
  },
  computed: {
    ...mapState(['components', 'dealStatus', 'languageData', 'currentUser']),
    language() {
      return this.languageData[this.components.DEALS] || {};
    },
  },
  created() {
    this.getDeals();
  },
  methods: {
    getDeals() {
      fetch(this.backendUrl + '/api/v1/escrow/deals', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + this.currentUser.accessToken
        }
      })
          .then(response => response.text())
          // eslint-disable-next-line no-console
          .then(data => console.log(data)
      /*data => {
            if (data.message === 'ok') {
              alert('success');
              this.deals.customer = data.customerDeals;
              this.deals.executor = data.executorDeals;
            }
            else {
              alert(data.message);
            }*/)
    },
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