// 改变左侧菜单的状态 参数flag:Boolean
const changeSidebarStatus = ({commit}, flag) => {
  commit('CHANGE_SIDEBAR_STATUS', flag);
};
export {
  changeSidebarStatus
};
