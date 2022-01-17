<template>
 <div class="tasks">
   <h1 class="headline">
     {{ language['tasks'] }}
   </h1>
   <div class="task-list">
     <div class="class-category" v-for="taskCategory in taskCategories" :key="taskCategory.category">
       <div class="category-name" :style="{background: taskCategory.color}">
         {{ language[taskCategory.category] }}:
       </div>
       <Task :categoryIndicator="taskCategory.color"/>
     </div>
   </div>
 </div>
</template>

<script>
import { mapState } from 'vuex'
import Task from './Task.vue'
import taskCategories from './../../../data/status/taskStatus.json'
export default {
  name: "Tasks",
  data(){
    return{
      taskCategories: taskCategories,
      toDoTasks: {},
      inProgressTasks: {},
      reviewTasks: {},
      completeTasks: {},
      cancelledTasks: {}
    }
  },
  computed: {
    ...mapState(['components', 'languageData']),
    language() {
      return this.languageData[this.components.TASKS] || {};
    }
  },
  components: {
    Task
  }
}
</script>

<style scoped>
  .tasks {
    margin-left: 20px;
    flex: 1;
  }

  .task-list{
    display: flex;
    gap: 20px;
  }

  .class-category{
    /* margin: 0 15px; */
  }

  .category-name{
    min-width: 250px;
    padding: 10px 25px;
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    color: #232829;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    flex-shrink: 0;
  }
</style>