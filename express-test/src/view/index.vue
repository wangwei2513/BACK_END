<template>
  <div class="todo-list">
    <div class="todo-form">
      <Form :model="todoForm" ref="todoForm" :rules="todoRules" :label-width="80">
        <FormItem label="title">
          <Input v-model="todoForm.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="label">
          <Input v-model="todoForm.label" placeholder="for what"></Input>
        </FormItem>
        <FormItem label="content">
          <Input v-model="todoForm.content" type="textarea" placeholder="specific..."></Input>
        </FormItem>
        <FormItem label="file">
          <Input v-model="todoForm.file" placeholder="....."></Input>
        </FormItem>
        <FormItem label="date">
          <Input v-model="todoForm.date" placeholder="when..."></Input>
        </FormItem>
      </Form>
      <Button type="primary" @click="addOne">addOne</Button>
    </div>
    <ul class="todo-ul">
      <li v-for="todo in todos" :key="todo.id">
        {{todo.name}}
        <i class="el-icon-error"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { addOne, findAll } from "../api/api.js";
export default {
  data() {
    return {
      todos: [],
      todoForm: {
        title: "",
        label: "",
        content: "",
        file: "",
        date: ""
      },
      todoRules: {
        title: [
          {
            required: true,
            message: "这是标题，谢谢！！！",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "这是内容，谢谢！！！",
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            message: "今个几号？",
            trigger: "blur"
          }
        ],
        label: [
          {
            required: true,
            message: "这是标签.",
            trigger: "blur"
          }
          // {
          //   type: "string",
          //   min: 6,
          //   message: "The password length cannot be less than 6 bits",
          //   trigger: "blur"
          // }
        ]
      }
    };
  },
  methods: {
    addOne() {
      this.$refs.todoForm.vilidate(vilid => {
        if (vilid) {
          addOne(this.todoForm)
            .then(res => {
              this.$Message.success("添加成功！！！");
            })
            .catch(err => {
              this.$Message.error("添加失败！！！");
            });
        }
      });
    }
  },
  mounted() {
    findAll().then(res => {
      this.todos = res;
    });
  }
};
</script>

<style scoped>
.todo-list {
  display: flex;
  flex-direction: row;
  flex: 1;
}
.todo-form {
  display: flex;
  flex-direction: column;
  flex: 0 0 50%;
  padding: 10px 20px;
  background: aliceblue;
}
.todo-ul {
  display: flex;
  flex-direction: column;
  flex: 1;
  background: skyblue;
}
</style>
