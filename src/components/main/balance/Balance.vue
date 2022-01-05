<template>
  <div class="head__balance">
    <div class="balance__headline">
      <p>Balance</p>
    </div>
    <div class="top_balance">
      <div class="balance__info">
        <p class="balance__value">42.745 <span class="value__name">NIM</span></p>
      </div>
      <div class="operations">
        <p id="income">INCOME : +74.125 </p>
        <p id="gas">GAS: -12.1</p>
        <p id="outcome">OUTCOME : -19.28 </p>
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
export default {
  name: "Balance"
}
</script>

<style scoped>

</style>