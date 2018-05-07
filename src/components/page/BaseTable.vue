<template>
    <div class="table-box">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <div class="opt-btn-box">
                    <el-button type="primary" icon="el-icon-circle-plus" @click="handleAdd"  size="small">添加</el-button>
                    <el-button type="danger" icon="el-icon-delete"  :disabled="this.multipleSelection.length== 0" @click="delAll" size="small">删除</el-button>
                </div>
                <div class="default-query-box">
                    <el-form :inline="true" :model="defaultQueryForm" class="default-query-form">
                        <el-form-item>
                            <el-input v-model="defaultQueryForm.name" placeholder="请输入关键词进行搜索"></el-input>
                        </el-form-item>
                        <el-form-item class="mlr0">
                            <el-button  type="primary"  icon="el-icon-search">查询</el-button>
                            <el-button  type="primary" @click="advancedQueryToggle(!advancedQueryShow)"  icon="el-icon-arrow-down">更多</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <el-table :data="tableData"  style="width: 100%" ref="multipleTable" stripe  @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="date" label="日期" width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="1000">
                </el-pagination>
            </div>
        </div>
        <!-- 高级查询 -->
        <transition name="fade">
            <div class="advanced-query-box" v-show="advancedQueryVisible">
                <div class="advanced-query-header">
                    <h3>高级查询</h3>
                    <el-button  type="danger" @click="advancedQueryToggle(!advancedQueryVisible)" icon="el-icon-close" ></el-button>
                </div>
                <el-form :model="advancedQueryForm" label-width="80px"  label-position="left"  class="advanced-query-form">
                    <el-form-item label="文本框">
                        <el-input v-model="advancedQueryForm.textDemo" placeholder="文本框"></el-input>
                    </el-form-item>
                    <el-form-item label="下拉菜单">
                        <el-select v-model="advancedQueryForm.selectDemo" placeholder="下拉菜单">
                        <el-option label="下拉菜单一" value="shanghai"></el-option>
                        <el-option label="下拉菜单二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="开关">
                        <el-switch
                        v-model="advancedQueryForm.switchDemo"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="多选框">
                        <el-checkbox-group v-model="advancedQueryForm.chenckDemo">
                            <el-checkbox label="选项一" name="type"></el-checkbox>
                            <el-checkbox label="选项二" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="单选钮">
                        <el-radio-group v-model="advancedQueryForm.radioDemo">
                            <el-radio label="选项一"></el-radio>
                            <el-radio label="选项二"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="选择日期">
                        <el-date-picker
                        v-model="advancedQueryForm.dateDemo"
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search">查询</el-button>
                        <el-button type="warning" icon="el-icon-close">清空</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </transition>

        <!-- 添加或编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="60%">
            <el-form ref="form" :model="addForm" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="addForm.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import api from '../../api/index';
    export default {
        data() {
            return {
                advancedQueryVisible: false,//高级查询是否展示
                tableList: [],
                idx: -1,
                rowId:'',
                cur_page: 1,
                multipleSelection: [],
                del_list: [],
                editVisible: false,
                delVisible: false,
                addForm: {
                    id:'',
                    name: '',
                    date: '',
                    address: ''
                },
                defaultQueryForm: {
                    name: ''
                },
                advancedQueryForm: {
                    textDemo: '',
                    chenckDemo: [],
                    dateDemo: '',
                    selectDemo: '',
                    radioDemo:'',
                    switchDemo: false
                }
                
            }
        },
        created() {
            this.getData();
        },
        computed: {
            tableData() {
                return this.tableList.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.id === this.del_list[i].id) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if(d.name.indexOf(this.defaultQueryForm.name) > -1){
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            //打开与关闭高级查询
            advancedQueryToggle(val) {
                if(val==false){
                    this.advancedQueryForm={
                        textDemo: '',
                        chenckDemo: [],
                        dateDemo: '',
                        selectDemo: '',
                        radioDemo:'',
                        switchDemo: false
                    }
                }
                this.advancedQueryVisible = val;
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取模拟数据
            getData() {
                this.$Progress.start();
                api.getTableList({
                    page: this.cur_page
                }).then((res) => {
                    this.tableList = res.data;
                    this.$Progress.finish();
                });
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            //添加
            handleAdd(){
                this.addForm = {
                    id:'',
                    name: '',
                    date: '',
                    address: ''
                }
                this.addForm.id = this.tableList.length;
                this.editVisible = true;
            },
            //编辑
            handleEdit(index, row) {
                // this.idx = index;
                // const item = this.tableList[index];
                // this.addForm = {
                //     id: item.id,
                //     name: item.name,
                //     date: item.date,
                //     address: item.address
                // }
                this.addForm=row;
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.rowId=row.id;
                this.idx = index;
                this.delVisible = true;
            },
            delAll() {
                this.$confirm('请确认是否删除选中的数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    const length = this.multipleSelection.length;
                    let str = '';
                    this.del_list = this.del_list.concat(this.multipleSelection);
                    for (let i = 0; i < length; i++) {
                        str += this.multipleSelection[i].name + ' ';
                    };
                    this.$message.error('删除了' + str);
                    this.multipleSelection = [];
                });    
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存添加/编辑
            saveEdit() {
                this.tableList.push(this.addForm);
                this.editVisible = false;
            },
            // 确定删除
            deleteRow(){
                //this.tableList.splice(this.idx, 1);
                for (let i = 0; i < this.tableList.length; i++) {
                    let item = this.tableList[i];
                    if (item.id === this.rowId) {
                        this.tableList.splice(i, 1);
                    }
                }
                this.$message.success('删除成功');
                this.delVisible = false;
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        width: 100%;
        position: relative;

    }
    .opt-btn-box{
        float: left;
    }
       
    .default-query-box{
        float: right;
    }
    
    .advanced-query-box{
        background: #fff;
        border:1px solid #f1f1f1;
        padding: 0 20px;
        padding-top: 20px;
        position: fixed;
        z-index: 999;
        right: 0;
        width: 300px;
        top: 60px;
        bottom: 0px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
    .advanced-query-form .el-select{
        width: 100%;
    }

    .advanced-query-header{
        width: 100%;
        margin-bottom: 20px;
        overflow: hidden;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
    }
    .advanced-query-header h3{
        font-size: 14PX;
        color: #333;
        float: left;
        height: 25px;
        line-height: 25px;;
    }
    .advanced-query-header .el-button{
        padding:5px 10px;
        float:right;
    }
    .default-query-form .el-input{
        width: 300px;
    }
    .default-query-box .el-button, .default-query-box .el-button{
        padding: 8px 15px;
    }
    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }


    /* 动画 */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>
