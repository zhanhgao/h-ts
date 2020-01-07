import API from './index'



// 策略管理
// 项目列表
export function getProjectList(data:any) {
  const url = '/project'
  return API.get(url,data)
}
// 删除项目
export function deleteProject(id:any) {
  const url = '/project/delete/'+id
  return API.delete(url,'')
}
