/*
set sidebar open or close,and some app setting
 */
const state = {
    serviceTypeList: [//业务类型
        { label: '品牌', value: 1 },
        { label: '自营DSP', value: 2 },
        { label: '第三方DSP', value: 3 },
        { label: '联盟', value: 4 },
    ],
    osList: [//系统
        { label: '通投', value: 0 },
        { label: 'Android', value: 1 },
        { label: 'IOS', value: 2 },
    ],
    tempBread: '',
}
const mutations = {
    SET_Bread(state, payload) {
        state.tempBread = String(payload)
    },
}
const actions = {
    changeBread({ commit },str) {
        commit('SET_Bread',str)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}