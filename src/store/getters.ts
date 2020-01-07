const getters = {
  token: (state: any) => state.user.token,
  userName: (state: any) => state.user.userName,
  roles: (state: any) => state.user.roles,
  routes: (state: any) => state.permission.routes,
  addRoutes: (state: any) => state.permission.addRoutes,
  permissionObj: (state: any) => state.permission.permissionObj,
  opened: (state: any) => {
    if (state.app.opened === 'false') {
      return false
    } else if (state.app.opened === 'true') {
      return true
    }
  },
  tempBread: (state: any) => state.global.tempBread,
  serviceTypeList: (state: any) => state.app.serviceTypeList,
  osList: (state: any) => state.app.osList
}
export default getters
