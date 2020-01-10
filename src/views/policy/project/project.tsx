import { Component, Vue } from 'vue-property-decorator';
import { getProjectList, deleteProject } from '@/api/api';
import DownArrow from '@/components/DownArrow';

@Component
export default class App extends Vue {
    // 初始化数据
    private showCard: boolean = true;
    private serviceType: string[] = [
        'serviceType',
        '品牌',
        '自营DSP',
        '第三方DSP',
        '联盟',
    ];
    private options: any = [
        { label: '品牌', value: 1 },
        { label: '自营DSP', value: 2 },
        { label: '第三方DSP', value: 3 },
        { label: '联盟', value: 4 },
    ];
    private formData: any = {
        projectName: '',
        serviceType: '',
        date: [],
    };
    private tableData: any = [];
    private permission: boolean = true;
    private diaIsShow: boolean = false;
    private rowIndex: number = 0;
    /** 
     * mixins-data
    */
    private pages: any = {
        pageSize: 10,
        pageNum: 1,
    };
    private pageSizes: number[] = [10, 20, 30, 40];
    private totalRecord: number = 0;
    private errorMsg: any = {
        'no-search': '请输入搜索内容',
        'no-checklist': '请先勾选列表',
    };
    private classObject: any = {
        'el-icon-arrow-down': true,
    };


    // 生命周期
    protected created() {
        this.getProjectList();
        // this.getNavPermission()
    }


    // 方法
    // mixins方法
    private changeShow():void {
        this.showCard = !this.showCard;
    }
    private mixResetPage() {
        this.pages = {
            pageSize: 10,
            pageNum: 1,
        };
    }
    // FromData不为空
    private mixCheckFromData(formData: string) {
        const type = Object.values(formData).filter((it: any) => {
            return it !== '' && it !== [];
        });
        return type.length ? true : false;
    }

    // 普通方法
    // 拉取项目列表
    private getProjectList(formName: any = 0) {
        let param = this.pages;
        // 来自搜索/change
        if (formName) {
            // 点搜索默认第一页
            if (formName === 'search') {
                this.mixResetPage();
            }
            param = {
                ...this.pages,
                projectName: this.formData.projectName,
                serviceType: this.formData.serviceType + '',
                startTime: this.formData.date && this.formData.date[0],
                endTime: this.formData.date && this.formData.date[1],
            };
        }
        getProjectList(param)
            .then((res: any) => {
                // 获取页面page
                const { totalRecord } = res.data.page;
                this.totalRecord = totalRecord;
                if (res.status === 0) {
                    this.tableData = res.data.items;
                } else {
                    this.$message.error(res.errorMsg);
                }
            })
            .catch((error: any) => {
                this.$message.error(error.errorMsg);
            });
    }
    private formatterServiceType(row: any) {
        const items = this.options.filter(
            (item: any) => item.value === Number(row.serviceType)
        )
        if (items && items[0]) {
            return items[0].label;
        }
        return row.serviceType;
    }

    private handleSize(val: any) {
        this.pages.pageSize = val;
        this.getProjectList(this.mixCheckFromData(this.formData));
    }
    private handlePage(val: any) {
        this.pages.pageNum = val;
        this.getProjectList(this.mixCheckFromData(this.formData));
    }
    private resetTab(formName: string) {
        this.mixResetPage();
        const ref: any = this.$refs[formName];
        ref.resetFields();
    }
    // // add
    private addTab() {
        this.$router.push({
            name: 'CreateProject',
        })
    }
    // // 编辑项目
    private editTab(row: any) {
        this.$router.push({
            name: 'CreateProject',
            params: {
                row: row,
            },
        })
    }
    // // 删除项目
    private deleteTab(row: any) {
        this.$confirm('此操作将永久删除相关数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
            .then(() => {
                deleteProject(row.id).then(res => {
                    if (res.status === 0) {
                        this.$notify({
                            title: '提示',
                            message: '删除成功',
                            type: 'success',
                            duration: 500,
                            onClose: () => {
                                this.getProjectList()
                            },
                        })
                    } else {
                        this.$message.error(res.errorMsg)
                    }
                })
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                })
            })
    }
    // 管理
    private manageTable(row: any) {
        this.$router.push({
            name: 'Tactics',
            params: {
                name: row.name,
                id: row.id,
            },
        })
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

    // render
    protected render() {
        let that = this;
        return (
            <div class="className">
                <el-card class="box-card">
                    <div slot="header" class="clearfix com-title">
                        <strong>条件筛选</strong>
                        <DownArrow></DownArrow>
                        {/* <DownArrow showCard={that.showCard} OnShowChange={that.changeShow}></DownArrow> */}
                    </div>
                    <div class="searchDiv">
                        {/* <el-form inline={true} ref="formData" model={that.formData}> */}
                        <el-form inline={true} ref="formData">
                            <el-form-item style="width: 30%" label="项目名称：" prop="projectName">
                                <el-input
                                    style="width: 170px"
                                    value={that.formData.projectName}
                                    onInput={(val: any) => this.formData.projectName = val}
                                    placeholder="项目名称/ID"
                                    clearable={true}
                                ></el-input>
                            </el-form-item>
                            <el-form-item style="width: 30%" label="业务类型：" prop="serviceType">
                                <el-select
                                    filterable
                                    clearable
                                    style="width: 170px"
                                    value={that.formData.serviceType}
                                    onChange={(val: any) => this.formData.serviceType = val}
                                    placeholder="业务类型"
                                >
                                    {
                                        that.options.map((item: any) => {
                                            return (<el-option
                                                label={item.label}
                                                value={item.value}
                                                key={item.value}
                                            ></el-option>)
                                        })
                                    }
                                </el-select>
                            </el-form-item>
                            <el-form-item label-width="90px" style="width: 40%" prop="date" label="选择时间：">
                                <el-date-picker
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd"
                                    value={that.formData.date}
                                    onInput={(val: any) => that.formData.date = val}
                                ></el-date-picker>
                            </el-form-item>
                            <el-form-item class="search-form-item">
                                <el-button
                                    type="primary"
                                    icon="el-icon-search"
                                    onClick={that.getProjectList.bind(this, 'search')}
                                >查询</el-button>
                                <el-button
                                    type="danger"
                                    icon="el-icon-refresh"
                                    onClick={that.resetTab.bind(this, 'formData')}
                                >重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
                <el-card class="anoCard">
                    <div slot="header" class="com-title">
                        <strong>项目列表</strong>
                        {
                            this.permission ? <el-button type="primary" icon="el-icon-circle-plus-outline" onClick={that.addTab.bind(this)}>添加项目</el-button> : ''
                        }
                    </div>
                    <el-table data={this.tableData} border stripe>
                        <el-table-column prop="id" label="项目ID" width="65"></el-table-column>
                        <el-table-column prop="name" label="项目名称"></el-table-column>
                        <el-table-column prop="serviceType" formatter={this.formatterServiceType} label="业务类型"></el-table-column>
                        <el-table-column prop="createName" label="创建人" width="70"></el-table-column>
                        <el-table-column label="时间" {...{
                            scopedSlots: {
                                default: (scope: any) => {
                                    return [
                                        <p>
                                            开始时间：<span>{scope.row.startTime}</span>
                                        </p>,
                                        <p>
                                            到期时间：<span>{scope.row.endTime}</span>
                                        </p>
                                    ];
                                }
                            }
                        }}>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="170px" {...{
                            scopedSlots: {
                                default: (scope: any) => {
                                    return [
                                        <el-button type="primary" onClick={that.manageTable.bind(this, scope.row)}>管理</el-button>,
                                        <el-button type="success" onClick={that.editTab.bind(this, scope.row)}>编辑</el-button>,
                                        <el-button type="danger" onClick={that.deleteTab.bind(this, scope.row)}>删除</el-button>,
                                    ];
                                }
                            }
                        }}>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        background
                        layout="total, sizes, prev, pager, next"
                        page-sizes={that.pageSizes}
                        page-size={that.pages.pageSize}
                        current-page={that.pages.pageNum}
                        total={that.totalRecord}
                        class="fyDiv"
                        on-size-change={that.handleSize.bind(this)}
                        on-current-change={that.handlePage.bind(this)}
                    ></el-pagination>
                </el-card>
            </div>
        )
    }
}

