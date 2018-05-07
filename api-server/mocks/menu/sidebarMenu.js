/**
 * 左侧SidebarMenu
 * @url /menu/sidebarMenu
 * Here you can write a detailed description
 * of the parameters of the information.
 */
module.exports = {
    "code|1": [0, 0, 0, 0, 1], // simulation error code, 1/5 probability of error code 1.
    "message|1": ["success","success","success","success","fail"],
    "data": [
        {
            icon: 'el-icon-setting',
            index: 'dashboard',
            title: '总览视图'
        },
        {
            icon: 'el-icon-tickets',
            index: 'table',
            title: '基础表格'
        },
        {
            icon: 'el-icon-message',
            index: 'tabs',
            title: 'tab选项卡'
        },
        {
            icon: 'el-icon-date',
            index: '3',
            title: '表单相关',
            subs: [
                {
                    index: 'form',
                    title: '基本表单'
                }
            ]
        },
        {
            icon: 'el-icon-warning',
            index: '403',
            title: '403页面'
        },
        {
            icon: 'el-icon-error',
            index: '404',
            title: '404页面'
        }
    ]    
   }