<template>
    <div class="sidebar">
        <el-menu class="gc-sidebar-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff"  unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import api from '../../api/index';
    export default {
        data() {
            return {
                items: []
            }
        },
        computed:{
            collapse () {
                return this.$store.state.collapse
            },
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        mounted(){
            this.$Progress.start();
            api.getSidebarMenuList().then((res) => {
                this.items = res.data;
                this.$Progress.finish();
            });        
        }
    }
</script>

<style scoped>
 .gc-sidebar-menu{
     overflow: hidden;
     border: none;
 }
</style>
