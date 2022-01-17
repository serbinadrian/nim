<template>
  <div class="balance">
    <h1 class="headline">
      {{ language['balance'] }}
    </h1>
    <div class="top_balance">
      <div class="balance__info">
        <p class="balance__value">42.745 <span class="value__name">NIM</span></p>
      </div>
      <div class="operations">
        <p id="income">{{ language['income'] }} : +74.125 </p>
        <p id="gas">{{ language['gas'] }}: -12.1</p>
        <p id="outcome">{{ language['outcome'] }} : -19.28 </p>
      </div>
    </div>
    <div class="transaction__list">
      <p class="headline__table">Transactions</p>
      <table>
        <tr class="header__table">
          <th>
            Address sender
          </th>
          <th>
            Address receiver
          </th>
          <th class="sum">
            Sum
          </th>
        </tr>
        <tr>
          <td>0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a</td>
          <td>0xea674fdde714fd979de3edf0f56aa9716b898ec8</td>
          <td class="sum">0.5</td>
        </tr>
        <tr>
          <td>0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a</td>
          <td>0xea674fdde714fd979de3edf0f56aa9716b898ec8</td>
          <td class="sum">0.24</td>
        </tr>
        <tr>
          <td>0xea674fdde714fd979de3edf0f56aa9716b898ec8</td>
          <td>0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a</td>
          <td class="sum">7.5</td>
        </tr>
        <tr>
          <td>0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a</td>
          <td>0xea674fdde714fd979de3edf0f56aa9716b898ec8</td>
          <td class="sum">0.5</td>
        </tr>
        <tr>
          <td>0xea674fdde714fd979de3edf0f56aa9716b898ec8</td>
          <td>0xea674fdde714fd979de3edf0f56aa9716b898ec8</td>
          <td class="sum">11</td>
        </tr>
        <tr>
          <td>0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a</td>
          <td>0xea674fdde714fd979de3edf0f56aa9716b898ec8</td>
          <td class="sum">16.247</td>
        </tr>
        <tr>
          <td>0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a</td>
          <td>0xea674fdde714fd979de3edf0f56aa9716b898ec8</td>
          <td class="sum">0.5</td>
        </tr>
        <tr>
          <td>0xab3b229eb4bcff881275e7ea2f0fd24eeac8c83a</td>
          <td>0xea674fdde714fd979de3edf0f56aa9716b898ec8</td>
          <td class="sum">0.28</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Balance",
  computed: {
    ...mapState(['components', 'languageData']),
    language() {
      return this.languageData[this.components.BALANCE] || {};
    }
  }
}
</script>

<style scoped>
.balance {
  margin-left: 20px;
  flex: 1;
  overflow: auto;
}

.balance__value {
  font-family: Inter, sans-serif;
  font-size: 96px;
  font-weight: bold;
  color: #232829;
  margin-top: 26px;
}

.value__name {
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 25px;
}

.top_balance {
  display: flex; 
  justify-content: space-between;
  margin-bottom: 210px;
}

.operations {
  font-family: Inter, sans-serif;
  font-weight: bold;
  color: #232829;
  margin-top: 48px;
  margin-right: 93px;
  font-size: 28px;
}

#income {color: var(--olive-dark);}
#gas {color: var(--asphalt-tinted);}
#outcome {color: var(--dark-context);}

.headline__table {
  color: var(--secondary-color-dark);
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 25px;
}

.transaction__list {
  padding-bottom: 10px;
}

.transaction__list table {
  font-family: Inter;
  color: var(--dark-context);
  font-size: 18px;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}

.transaction__list tr {
  font-size: 18px;
}

.transaction__list tr th:first-of-type,
.transaction__list tr td:first-of-type {
  border: 1px solid var(--olive-dark);
  border-right: none;
}

.transaction__list tr th,
.transaction__list tr td {
  border: 1px solid var(--olive-dark);
  border-left: none;
  border-right: none;
  padding: 20px 30px;
}

.transaction__list tr th:last-of-type,
.transaction__list tr td:last-of-type {
  border: 1px solid var(--olive-dark);
  border-left: none;
}

.transaction__list tr:first-of-type th:first-of-type {
  border-top-left-radius: 30px;
}

.transaction__list tr:first-of-type th:last-of-type {
  border-top-right-radius: 30px;
}

.transaction__list tr:last-of-type td:first-of-type {
  border-bottom-left-radius: 30px;
}

.transaction__list tr:last-of-type td:last-of-type {
  border-bottom-right-radius: 30px;
}

.transaction__list th {
  text-align: left;
  font-size: 24px;
  background-color: var(--olive-tinted);
}

.transaction__list .sum {
  text-align: center;
  font-size:24px;
  font-weight: bold;
}
</style>