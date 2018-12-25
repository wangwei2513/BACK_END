<template>
  <div class="todo-list">
    <div class="todo-form">
      <Form :model="todoForm" ref="todoForm" :rules="todoRules" :label-width="80">
        <FormItem prop="title" label="title">
          <Input v-model="todoForm.title" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem prop="label" label="label">
          <Input v-model="todoForm.label" placeholder="for what"></Input>
        </FormItem>
        <FormItem prop="content" label="content">
          <Input v-model="todoForm.content" type="textarea" placeholder="specific..."></Input>
        </FormItem>
        <FormItem prop="file" label="file">
          <Input v-model="todoForm.file" placeholder="....."></Input>
        </FormItem>
        <FormItem prop="date" label="date">
          <Input v-model="todoForm.date" placeholder="when..."></Input>
        </FormItem>
      </Form>
      <Button type="primary" @click="add('todoForm')">addOne</Button>
      <!-- <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
        </FormItem>
      </Form> -->
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
        label: [
          {
            required: true,
            message: "标签呀！",
            trigger: "blur"
          }
        ],
        content: [
          {
            required: true,
            message: "嘛呢！！！",
            trigger: "blur"
          }
        ],
        date: [
          {
            required: true,
            message: "哪天？？",
            trigger: "blur"
          }
        ]
      },
      formInline: {
        user: "",
        password: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          }
          // ,
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
    add(name) {
      this.$refs[name].validate(valid => {
        console.log(valid);
        if (valid) {
          addOne(this.todoForm)
            .then(res => {
              this.$Message.success("添加成功！！！");
            })
            .catch(err => {
              this.$Message.error("添加失败！！！");
            });
        } else {
          this.$Message.error("请检查表单");
        }
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
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
