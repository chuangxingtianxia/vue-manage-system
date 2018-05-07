<template>
    <div class="header">
        <div class="logo-content" :class="{'logo-collapse':collapse}">
            <a href="#">
                <span class="logo-img"><i class="el-icon-upload"></i></span>
                <span class="logo-name" v-if="!collapse"><b>云安全管控平台</b></span>
            </a>
        </div>
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="changeSidebarStatus(!collapse)">
            <i class="el-icon-menu"></i>
        </div>
        <div class="top-operation-wrap">
            <!-- 全屏显示 -->
            <div class="btn-fullscreen" @click="handleFullScreen">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="el-icon-rank"></i>
                </el-tooltip>
            </div>
            <!-- 消息中心 -->
            <div class="btn-bell">
                <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                    <router-link to="/tabs">
                        <i class="el-icon-bell"></i>
                    </router-link>
                </el-tooltip>
                <span class="btn-bell-badge" v-if="message"></span>
            </div>
            <!-- 个人中心 -->
            <el-dropdown class="dropdown-item" @command="handleCommand" trigger="click">
                <span class="el-dropdown-link">
                    <img class="logo-img" src="static/img/user_dp.jpg"> 
                     {{username}}
                    <i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item  command="loginout">安全退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>      
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {mapActions, mapGetters} from 'vuex';
    export default {
        data() {
            return {
                fullscreen: false,
                name: 'Chuangxiangtianxia',
                message: 2
            }
        },
        computed:{
            ...mapGetters({
                collapse:'getCollapse',
            }),
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
          ...mapActions([ // https://vuex.vuejs.org/zh-cn/actions.html
            'changeSidebarStatus'
            ]),
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    localStorage.removeItem('ms_username')
                    this.$router.push('/login');
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                this.$store.dispatch('changeSidebarStatus' , this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        font-size: 22px;
        color: #fff;
        background: #242f42;
    }

    .logo-content{
        height: 60px;
        background: #121a2c;
        width: 200px;
        padding: 0 20px;
        line-height:60px;
        box-sizing: border-box;
        float: left;
        -webkit-transition: width .3s ease-in-out;
        transition: width .3s ease-in-out;
    }
    .logo-collapse{
        width: 65px;
    }
    .logo-content a{
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #fff;
    }
    .logo-content a:hover{
        text-decoration: none;
    }
    .logo-content span b{
        margin-left: 0px;
        font-weight: normal;
        font-size: 16px;
        vertical-align:5px;
    }
    .logo-content span i{
        font-size: 26px;
    }
    .collapse-btn{
        float: left;
        padding: 0 20px;
        cursor: pointer;
        line-height: 60px;
    }
    .top-operation-wrap{
        float: right;
        height: 30px;
        margin-top: 15px;
    }
  
    .btn-bell, .btn-fullscreen{
        float: left;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
        line-height: 30px;
        margin-left: 8px;
    }
    .btn-bell{
        position: relative;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .dropdown-item{
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 14px;
        float: left;
        cursor: pointer;
        padding: 0 20px;
    }
    .logo-img{
        height: 30px;
        width: 30px;
        float: left;
        margin-right: 5px;
        border-radius: 50%;
    }
   
</style>
