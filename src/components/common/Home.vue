<template>
    <el-container class="gc-wrapper">
        <el-header class="gc-header">
            <gc-head></gc-head>
        </el-header>
        <el-container class="gc-container">
           <el-aside class="gc-aside" v-bind:style="{width: asideWidth + 'px' }">
               <gc-sidebar></gc-sidebar>
           </el-aside>
           <el-container>
               <el-main class="gc-mian">
                   <div class="gc-tabs">
                        <gc-tags></gc-tags>
                   </div>
                   <div class="gc-main-bg">
                        <div class="gc-content">
                            <transition name="move" mode="out-in">
                                <keep-alive>
                                    <router-view></router-view>
                                </keep-alive>
                            </transition>
                        </div>
                   </div>  
               </el-main>
               <!-- <el-footer class="gc-footer">
                    Copyright © 2017-2020 UltraSafe.All Rights Reserved. 
               </el-footer> -->
           </el-container>    
        </el-container>
    </el-container>
</template>

<script>
    import Vue from 'vue';
    import {mapActions, mapGetters} from 'vuex';
    import gcHead from './Header.vue';
    import gcSidebar from './Sidebar.vue';
    import gcTags from './Tags.vue';
    export default {
        data(){
            return {
                islogin: false
            }
        },
        // computed:{
        //     collapse () {
        //         return this.$store.state.collapse
        //     },
        //     asideWidth(){
        //         return this.collapse ? 65 : 200;
        //     }
        // },
        computed: {
            ...mapGetters({
                collapse:'getCollapse',
            }),
            asideWidth(){
                return this.collapse ? 65 : 200;
            }
        },
        components:{
            gcHead, gcSidebar, gcTags
        }
    }
</script>
<style>
.gc-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #f0f0f0;
}
.gc-header{
    position: fixed;
    top: 0;
    z-index: 1020;
    box-sizing: border-box;
    padding: 0px;
    width: 100%;
    height: 60px;
    background-color: #fff;
    background-color: #242f42;
}
.gc-container{
    margin-top: 60px;
}
.gc-aside{
  max-height: 100vh;
  background: #324157;
  -webkit-transition: width .3s ease-in-out;
  transition: width .3s ease-in-out;
}

.gc-mian{
    height: calc(100vh - 60px);
    padding: 20px;
    overflow-y: auto;
    background: #f0f0f0;
}
.gc-main-bg{
    background: #fff;
    padding: 20px;
    border: 1px solid #e4e7ed;
}
.gc-tabs{
    height: 40px;
    width: 100%;
}
.gc-footer{
  text-align: center;
  line-height: 40px;
  height: 40px !important;
  background: #20a0ff;
  color:#ffffff;
}

</style>
