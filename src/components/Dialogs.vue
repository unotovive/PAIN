<template>
<transition name="modal">
    <div class="backdrop" @click="dismissModal">
    <form class="dialog" @click.stop>
        <v-avatar size="100px">
            <img src="../assets/pain.jpg">
        </v-avatar>
        <h1>{{frend.name}}</h1>
        <h2>{{frend.mail}}</h2>
        <div class="buttons">
            <button><v-icon>chat</v-icon><p>トーク</p></button>
            <button class="remove"><v-icon>delete_forever</v-icon><p>友だち削除</p></button>
        </div>
    </form>
    </div>
</transition>
</template>
<script>
  import { auth } from '../firebase'
  import { database } from '../firebase'
  export default {
    props: ['frend'],
    methods: {
        getuid () {
            var user = auth.currentUser
            if(user != null){
            console.log("getuid")
            return auth.currentUser.uid
            }
        },
      remove(){
        var todosRef=database.ref(`users/${this.getuid()}/todos`)
        todosRef.child(this.todo['.key']).remove()
        this.$emit('close')
        },
      update () {
          var todosRef=database.ref(`users/${this.getuid()}/todos`)
          console.log(this.todo.title)
          console.log(this.todo.content)
          todosRef.child(this.todo['.key']).update({title:this.todo.title, content:this.todo.content,type:this.todo.type})
          this.$emit('close')
        },
      dismissModal () {
        this.$emit('close')
        }
    }
  }
</script>
<style>
h1{
    margin-top:20px;
    margin-bottom:5px;
    font-size: 2em;
}
h2{
    font-size: 1.2em;
    color:#676767;
    margin-bottom:15px;
}
p{
    margin:0;
}
.buttons{
    width: 100%;
    color:#999;
    border-top: 1px solid;
    margin-top:40px;
}
.backdrop{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(50,50,50,0.8);
    transition: all .3s ease;
  }
  form.dialog{
    position: relative;
    width: 480px;
    max-width: 100%;
    margin: 25vh auto 0;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 50px #555;
    transition: all .3s ease;
    padding-top: 30px;
  }
  form.dialog button{
    width:49%;
    padding: 15px;
    background: none;
    font-size: 10px;
    opacity: 0.8;
    cursor: pointer;
    transition: opacity .5s;
    color:#334;
  }
form.dialog button:hover, form.dialog button:focus{
    opacity: 1;
    background: #eee;
  }
  form.dialog button.remove:hover, form.dialog button.remove:focus{
    opacity: 1;
    color:#e2434b;
    background: #eee;
  }

.modal-enter-active {transition: opacity .3s;}
/* 往路の開始状態を設定するためのクラス */
.modal-enter        {opacity: 0;}
/* 往路の終了状態を設定するためのクラス */
.modal-enter-to     {opacity: 1;}
/* 復路のアニメーション全体に対して設定をするためのクラス */
.modal-leave-active {transition: opacity .6s;}
/* 復路の開始状態を設定するためのクラス */
.modal-leave        {opacity: 1;}
/* 復路の終了状態を設定するためのクラス */
.modal-leave-to     {opacity: 0;}

</style>


