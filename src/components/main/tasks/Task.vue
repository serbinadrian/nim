<template>
  <div class="task">
    <div class="task-category-indicator" :style="{background: categoryIndicator}">
      <!--color indicator-->
    </div>
    <div class="task-body">
      <div class="task-to-complete">
        <!--{{taskToComplete}}-->
        Invent computing machine
      </div>
      <div class="task-execution-info">
        <div class="task-executors">
          <!--v-for executor in task executors-->
          <div class="task-executor">
            <img src="./../../../../public/img/Ellipse2.png" alt="">
          </div>
          <div class="task-executor">
            <img src="./../../../../public/img/Ellipse3.png" alt="">
          </div>
          <div class="task-executor">
            <img src="./../../../../public/img/Ellipse6.png" alt="">
          </div>

        </div>
        <div class="task-reward">
          <!--{{taskReward}}-->
          6 ETH
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task.vue",
  props: {
    categoryIndicator: String
  }
}
</script>

<style scoped>
  .task{
    margin: 15px 0 15px 0;
    width: 250px;
    height: 200px;
    display: flex;
    flex-wrap: nowrap;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
    border-radius: 30px;
    overflow: hidden;
  }

  .task-category-indicator{
    width: 10%;
    height: 100%;
    //background: blue;
  }

  .task-body{
    background: #90CFBA;
    width: 90%;
    height: 100%;
    position: relative;
  }

  .task-to-complete{
    font-size: 24px;
    line-height: 29px;
    color: #232829;
    font-weight: bold;
    padding: 20px 10px 10px 10px;
  }

  .task-execution-info{
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px 10px 10px;
  }

  .task-executors{
    display: flex;
    flex-wrap: nowrap;
  }

  .task-executors:hover .task-executor{
    margin-right: 7px;
    transition: .3s ease;
  }

  .task-executor{
    width: 20px;
    height: 20px;
    overflow: hidden;
    margin-right: -7px;
    border-radius: 50%;
  }

  .task-executor img{
    width: 100%;
    height: 100%;
  }

  .task-reward{
    color: #232829;
    font-weight: bold;
    font-size: 18px;
  }
</style>