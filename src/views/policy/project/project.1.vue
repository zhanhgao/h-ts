<template>
    <div class="className">
        <p>{{showCard}}</p>
        <el-card class="box-card">
            <div slot="header" class="clearfix com-title">
                <strong>条件筛选</strong>
                <down-arrow :showCard="showCard" :callCb="changeShow"></! 
            </div>
            <div class="searchDiv" v-if="showCard">
                <el-form
                    :rules="rules"
                    :inline="true"
                    ref="formData"
                    :model="formData"
                    class="demo-form-inline"
                >
                    <el-form-item style="width: 30%" label="项目名称：" prop="projectName">
                        <el-input
                            style="width: 170px"
                            v-model="formData.projectName"
                            placeholder="项目名称/ID"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item style="width: 30%" label="业务类型：" prop="serviceType">
                        <el-select
                            filterable
                            clearable
                            style="width: 170px"
                            v-model="formData.serviceType"
                            placeholder="业务类型"
                        >
                            <el-option
                                v-for="item in options"
                                :label="item.label"
                                :value="item.value"
                                :key="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="90px" style="width: 40%" prop="date" label="选择时间：">
                        <el-date-picker
                            v-model="formData.date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item class="search-form-item">
                        <el-button
                            type="primary"
                            icon="el-icon-search"
                            @click="getProjectList('search')"
                        >查询</el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-refresh"
                            @click="resetTab('formData')"
                        >重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <el-card class="anoCard">
            <div slot="header" class="com-title">
                <strong>项目列表</strong>
                <el-button
                    v-if="permission"
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    @click="addTab"
                >添加项目</el-button>
            </div>
            <el-table :data="tableData" border stripe>
                <el-table-column prop="id" label="项目ID" width="65"></el-table-column>
                <el-table-column prop="name" label="项目名称"></el-table-column>
                <el-table-column prop="serviceType" :formatter="formatterServiceType" label="业务类型"></el-table-column>
                <el-table-column prop="createName" label="创建人" width="70"></el-table-column>
                <el-table-column label="时间">
                    <template slot-scope="scope">
                        <p>
                            开始时间：
                            <span>{{scope.row.startTime}}</span>
                        </p>
                        <p>
                            到期时间：
                            <span>{{scope.row.endTime}}</span>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="170px" v-if="permission">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="manageTable(scope.row,scope.$index)">管理</el-button>
                        <el-button type="success" @click="editTab(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="deleteTab(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100px" v-if="!permission">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="manageTable(scope.row,scope.$index)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                layout="total, sizes, prev, pager, next"
                :page-sizes="pageSizes"
                :page-size="pages.pageSize"
                :current-page="pages.pageNum"
                :total="totalRecord"
                class="fyDiv"
                @size-change="handleSize"
                @current-change="handlePage"
            ></el-pagination>
        </el-card>
    </div>
</template>


<script lang="ts">
// import Vue from 'vue'
// import Component from 'vue-class-component'
import { Component, Vue } from 'vue-property-decorator'

// import { getProjectList,deleteProject } from '@/api/api'
// import DownArrow from '@/components/DownArrow'

@Component({})
export default class Project extends Vue {
    // 初始化数据
    private showCard: boolean = true
    // serviceType: string[] = [
    //     'serviceType',
    //     '品牌',
    //     '自营DSP',
    //     '第三方DSP',
    //     '联盟',
    // ]
    // options: any = [
    //     { label: '品牌', value: 1 },
    //     { label: '自营DSP', value: 2 },
    //     { label: '第三方DSP', value: 3 },
    //     { label: '联盟', value: 4 },
    // ]
    // formData: any = {
    //     projectName: '',
    //     serviceType: '',
    //     date: [],
    // }
    // tableData: any = []
    // permission: boolean = true
    // diaIsShow: boolean = false
    // rowIndex: number = 0
    // pages: any = {
    //     pageSize: 10,
    //     pageNum: 1,
    // }
    // pageSizes: number[] = [10, 20, 30, 40]
    // totalRecord: number = 0
    // errorMsg: any = {
    //     'no-search': '请输入搜索内容',
    //     'no-checklist': '请先勾选列表',
    // }
    // classObject: any = {
    //     'el-icon-arrow-down': true,
    //     rotateZ180: this.showCard,
    // }

    // 生命周期
    beforeCreate() {
        console.log('before create')
    }
    created() {
        this.getProjectList()
        // this.getNavPermission()
    }
    beforeMount() {
        console.log('before mount')
    }
    mounted() {
        console.log('mounted')
    }
    
    // 方法
    changeShow() {
        this.showCard = !this.showCard
    }
    mixResetPage() {
        // this.pages = {
        //     pageSize: 10,
        //     pageNum: 1,
        // }
    }
    //FromData不为空
    mixCheckFromData(formData: string) {
        // let _type = Object.values(formData).filter((it: any) => {
        //     return it != '' && it != []
        // })
        // return _type.length ? true : false
    }
    // 拉取项目列表
    getProjectList(formName: any = 0) {
        // let __param = this.pages
        // //来自搜索/change
        // if (formName) {
        //     // 点搜索默认第一页
        //     if (formName == 'search') {
        //         this.mixResetPage()
        //     }
        //     __param = {
        //         ...this.pages,
        //         projectName: this.formData.projectName,
        //         serviceType: this.formData.serviceType + '',
        //         startTime: this.formData.date && this.formData.date[0],
        //         endTime: this.formData.date && this.formData.date[1],
        //     }
        // }
        // getProjectList(__param)
        //     .then((res:any) => {
        //         // 获取页面page
        //         let { totalRecord } = res.data.page
        //         this.totalRecord = totalRecord
        //         if (res.status === 0) {
        //             // this.tableData = this.tableData.concat(res.data.items);
        //             this.tableData = res.data.items
        //         } else {
        //             this.$message.error(res.errorMsg)
        //         }
        //     })
        //     .catch((error:any) => {
        //         this.$message.error(error.errorMsg)
        //     })
    }
    formatterServiceType(row: any) {
        //     const items = this.options.filter(
        //         item => item.value === Number(row.serviceType)
        //     )
        //     if (items && items[0]) {
        //         return items[0].label
        //     }
        //     return row.serviceType
    }

    handleSize(val: any) {
        //     this.pages.pageSize = val
        //     this.getProjectList(this.mixCheckFromData(this.formData))
    }
    handlePage(val: any) {
        //     this.pages.pageNum = val
        //     this.getProjectList(this.mixCheckFromData(this.formData))
    }
    resetTab(formName: string) {
        //     this.mixResetPage()
        //     this.$refs[formName].resetFields()
    }
    // // add
    addTab() {
        //     this.$router.push({
        //         name: 'CreateProject',
        //     })
    }
    // // 编辑项目
    editTab(row: any) {
        //     // this.$store.commit('policy/SET_ROW',row)
        //     this.$router.push({
        //         name: 'CreateProject',
        //         params: {
        //             row: row,
        //         },
        //     })
    }
    // // 删除项目
    deleteTab(row: any) {
        //     this.$confirm('此操作将永久删除相关数据, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning',
        //     })
        //         .then(() => {
        //             deleteProject(row.id).then(res => {
        //                 if (res.status === 0) {
        //                     this.$notify({
        //                         title: '提示',
        //                         message: '删除成功',
        //                         type: 'success',
        //                         duration: 500,
        //                         onClose: () => {
        //                             this.getProjectList()
        //                         },
        //                     })
        //                 } else {
        //                     this.$message.error(res.errorMsg)
        //                 }
        //             })
        //         })
        //         .catch(() => {
        //             this.$message({
        //                 type: 'info',
        //                 message: '已取消删除',
        //             })
        //         })
    }
    // // 管理
    manageTable(row: any) {
        //     // console.log('编辑==>', row.name,row.id);
        //     this.$router.push({
        //         name: 'Tactics',
        //         params: {
        //             name: row.name,
        //             id: row.id,
        //         },
        //     })
    }
    // 获取用户nav权限
    // getNavPermission() {
    //     let _permissionList = this.$store.getters.permissionObj,
    //         _name = this.$route.name,
    //         _res = _permissionList.filter(item => {
    //             if (item.name === _name) {
    //                 return item
    //             }
    //         })
    //     this.permission = _res[0].permission === 1 ? true : false //类型         1:读写  2:只读
    // },
    // },
}

// import DownArrow from '@/components/DownArrow'
// import mixins from '@/mixins'
// import { mapGetters } from 'vuex'
