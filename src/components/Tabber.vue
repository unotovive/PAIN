<template>
    <v-card height="56px"  flat>
            <v-bottom-nav :value="true" :active.sync="e1" absolute color="frnd">
                <v-btn flat color="amber" value="frnd">
                <span>友だち</span>
                <v-icon>supervised_user_circle</v-icon>
            </v-btn>
            <v-btn flat color="amber" value="talk">
                <span>トーク</span>
                <v-icon>chat</v-icon>
            </v-btn>
            <v-btn flat color="amber" value="sett">
                <span>設定</span>
                <v-icon>settings</v-icon>
            </v-btn>
            <v-btn flat color="amber" value="lout" @click="logout">
                <span>ログアウト</span>
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-bottom-nav>
    </v-card>
</template>
  
  <script>
import { auth } from '../firebase'
export default {
    data () {
      return {
        e1: 'frnd'
      }
    },
    methods:{
        logout(){
            auth.signOut().then(function() {
             console.log("Signed out.")
             
             });
             this.$router.push({path:'/Title'})
        }
    }
}
</script>
<style scoped>

</style>