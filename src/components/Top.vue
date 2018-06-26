<template>
        <div id="container">
            <div id="content">
                <v-card>
                    <v-toolbar color="orange" dark>
                    <v-toolbar-title>友だち</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="toAdd()">
                        <v-icon >person_add</v-icon>
                    </v-btn>
                    </v-toolbar>

                    <v-list two-line subheader>
                    <v-subheader>プロフィール</v-subheader>
                    <v-list-tile avatar @click="dialog({name:myName,mail:myMail})">
                        <v-list-tile-avatar>
                        <img src="../assets/pain.jpg">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title>{{myName}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{myMail}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                        <v-btn icon ripple>
                            <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>

                    <v-divider inset></v-divider>
                    <v-subheader>友だちリスト</v-subheader>
                    <v-list-tile v-for="frend in frends" :key="frend['.key']" avatar @click="dialog({name:getName(frend.id),mail:getMail(frend.id)})">
                        <v-list-tile-avatar>
                        <img src="../assets/pain.jpg">
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                        <v-list-tile-title>{{getName(frend.id)}}</v-list-tile-title>
                        <v-list-tile-sub-title>{{getMail(frend.id)}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                        <v-btn icon ripple>
                            <v-icon color="grey lighten-1">info</v-icon>
                        </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                    </v-list>
                </v-card>
            </div>
            
            <div id="containerup">
                <tabber id="tab"/>
            </div>
            <div id="containerup">
                <dialogs id="dialogs" v-if="showDialog" @close="showDialog=false" :frend="selectedFrend"/>
            </div>
        </div>
</template>
<script>
import { auth } from '../firebase'
import Tabber from './Tabber'
import Dialogs from './Dialogs'
import {database} from '../firebase'

let frendsRef = database.ref('users')

export default {
    components: {
      Tabber,
      Dialogs
    },
    data () {
      return {
        showDialog: false,
        selectedFrend:null,
        e1: 'frnd',
        myName:'',
        myMail:''
      }
    },
    beforeCreate:function(){
        auth.onAuthStateChanged((user) => {
        if (user) {
          this.user = user
          this.$bindAsArray('frends', database.ref(`users/${user.uid}/frends`))
          var name='';
          var frendRef = database.ref('users/'+user.uid+'/profile/name')
            var name='';
            frendRef.on('value', function(snapshot) {
            console.log(snapshot.val());
            name=snapshot.val();
            })
        this.myName=name
        this.myMail=user.email
        }
      })
    },
    firebase:{
        frends:frendsRef
    },
    methods:{
        dialog(frend){
            this.selectedFrend=frend
            this.showDialog=true
            console.log(this.selectedFrend)
        },
        getName(id){
            var frendRef = database.ref('users/'+id+'/profile/name')
            var name='';
            frendRef.on('value', function(snapshot) {
                console.log(snapshot.val());
                name=snapshot.val();
            })
        return name;
        },
        getMail(id){
            var frendRef = database.ref('users/'+id+'/profile/mail')
            var mail=''
            frendRef.on('value', function(snapshot) {
                console.log(snapshot.val());
                mail=snapshot.val();
            })
        return mail
        },
        
        toAdd(){
            this.$router.push({path:'/Add'})
        },
        logout(){
            auth.signOut().then(function() {
             console.log("Signed out.")
             
             });
             this.$router.push({path:'/Title'})
        },
        getuid(){
            var user = auth.currentUser
            if(user != null){
            console.log("getuid")
            return auth.currentUser.uid
            }
        }
    }
}
</script>
<style scoped>
.z-top{
    position: relative;
    z-index: 100;
}
.z-bot{
    position: relative;
    z-index: 0;
}
#dialogs{
}
#container{
    width: 100%;
    position: relative;
    height: auto !important;
    height: 100%;
    min-height: 100%;
    z-index: -100000 !important;
}
#containerup{
    position: relative;
    z-index:2147483647 !important;
}
#content{
    position: relative;
    padding-bottom: 56px;
}
#tab{
    position: fixed;
	bottom: 0;
    right:0;
    left: 0;
    opacity: 1;
}
</style>
