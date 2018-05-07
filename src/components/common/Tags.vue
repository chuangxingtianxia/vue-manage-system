<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path),'no-border':!index}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tagsList: []
            }
        },
        methods: {
            isActive(path) {
                return path === this.$route.path;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.path && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.$router.push('/');
            },
            // 关闭其他标签
            closeOther(){
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.path;
                })
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.path === route.path;
                })
                !isExist && this.tagsList.push({
                    title: route.meta.title,
                    path: route.path
                })
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
            }
        },
        created(){
            this.setTags(this.$route);
        }
    }

</script>


<style>
    .tags {
        position: relative;
        height: 40px;
        background: #f5f7fa;
        padding-right: 120px;
        border: 1px solid #e4e7ed;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        float: left;
        margin: 0;
        border-radius: 0px;
        font-size: 14px;
        overflow: hidden;
        cursor: pointer;
        height: 39px;
        line-height: 39px;
        background: #f5f7fa;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
        color: #333;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
      
    }

    .tags-li:not(.active):hover {
        background: #e4e7ed;
        border-left: 1px solid #dcdfe6;
        height: 40px;
    }

    .tags-li.active {
        color: #666;
        border-right: 1px solid #dcdfe6;
        border-left: 1px solid #dcdfe6;
        border-bottom: 1px solid #fff;
        height: 40px;
        background-color: #ffffff;
    }
   .tags-li.active.no-border{
        border-left-color: transparent;

    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }
    .tags-li-title:hover{
        text-decoration: none;
    } 
    .tags-li.active .tags-li-title {
        color: #666;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 5px;
        text-align: center;
        width: 110px;
        height: 40px;
        z-index: 10;
    }
 

</style>
