<template>
    <div class="app-container">

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button
                    type="primary"
                    plain
                    icon="el-icon-plus"
                    size="mini" :disabled="single"
                    @click="settingShow(1)"
                    v-hasPermi="['planning:show:edit']"
                >选为大屏展示示范县
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="danger"
                    plain
                    icon="el-icon-minus"
                    size="mini" :disabled="single"
                    @click="settingShow(0)"
                    v-hasPermi="['planning:show:edit']"
                >取消大屏展示示范县
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    type="warning"
                    plain
                    icon="el-icon-close"
                    size="mini" :disabled="single"
                    @click="selectOne(null)"
                >取消选中
                </el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button
                    plain
                    icon="el-icon-refresh-left"
                    size="mini" :disabled="loading"
                    @click="reset"
                >刷新
                </el-button>
            </el-col>
        </el-row>

        <el-table ref="showTable" v-loading="loading" :data="showList" highlight-current-row @current-change="selectOne"
                  row-key="showId" border :load="load" lazy :tree-props="{hasChildren: 'hasChildren'}" :cell-class-name="columnStyle">
            <el-table-column type="index" width="50" align="center"/>
            <el-table-column label="问题属地" align="center" width="100" prop="zoneName"/>
            <el-table-column label="是否系统统计结果" width="80" align="center" prop="auto">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.auto">是</el-tag>
                    <el-tag type="warning" v-if="!scope.row.auto">否</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否已上大屏" width="60" align="center" prop="auto">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.show == 1">是</el-tag>
                    <el-tag type="warning" v-if="!(scope.row.show == 1)">否</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="110" align="center" prop="createTime" :show-overflow-tooltip="true"/>
            <el-table-column v-for="obj  in  dict.type.planning_standard_type" :label="obj.label" align="center">
                <el-table-column v-for="standard in standardList" v-if="standard.type == obj.value" align="center"
                                 :label="standard.quotaName+(obj.value == 1 ? (standard.value+'人') : '')"
                                 prop="resultJson">
                    <el-table-column v-if="obj.value == 0" label="指标数" align="center" width="65">
                        <template slot-scope="scope">&nbsp;&nbsp;≤&nbsp;&nbsp;{{scope.row.standardNum[standard.standardId]}}</template>
                    </el-table-column>
                    <el-table-column v-if="obj.value == 0" label="实际发生数" align="center" width="100">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.resultJson[standard.standardId]"
                                      v-on:change="handelPointNumber(scope.row.resultJson[standard.standardId], scope.row, standard.standardId)"
                                      @input="handleNumInput(standard.standardId, scope.row.resultJson)"
                                      @keydown.native="limitInputValue"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="obj.value == 0" label="人口发生数量" align="center" width="100">
                        <template slot-scope="scope" v-if="scope.row.jingJson[standard.standardId]">
                            <el-input
                                      v-model="scope.row.jingJson[standard.standardId][0]"
                                      @input="handleDecimalInput(standard.standardId,  scope.row.jingJson)"
                                      @keydown.native="limitInputValue"></el-input>
                        </template>
                    </el-table-column>
                    <template slot-scope="scope" v-if="obj.value == 1">
                        <el-input v-model="scope.row.resultJson[standard.standardId]"
                                  @input="handleNumInput(standard.standardId, scope.row.resultJson)"
                                  @keydown.native="limitInputValue"></el-input>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="操作" align="center" width="80" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-edit"
                               @click="saveInfo(scope.row)" v-hasPermi="['planning:show:add']">保存
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    import {handleNumber} from "@/utils/index";
    import {listShow, addShow, updateShow, getShow, getInfoByParm} from "@/api/backstage/planning/show";
    import {listStandard} from "@/api/backstage/planning/standard";
    import {listPopulation} from "@/api/backstage/planning/population";

    export default {
        name: "show",
        dicts: ['planning_standard_type'],
        data() {
            return {
                open: false,
                // 遮罩层
                loading: false,
                // 非单个禁用
                single: true,
                rules: [],
                showList: [],
                standardList: [],
                populationMap: {},
                checketShow: null,
                reg: /^[^0-9.]*$/,
                initPeriods: null,   //初始化全国人口统计期数  参数中的 planning.population.periods
                standardMap:{},
                jingMap:{
                    ENTER_JING_VISIT_ID:"59811fb2995f48d5829a85cdc982b213",/** 赴国家走访 ID */
                    ENTER_JING_LETTER_ID: "a8baad8ec87f40ffa37067f7b0e912e0", /** 向国家写信 ID*/
                    ENTER_JING_INTERNET_ID :"bab30392cc5f4244bb0824c3d2e3afd3",/** 向国家局网投 ID*/
                },
            };
        },
        created() {
            this.getstandardList();
            this.getPopulationList();
            this.getList();
        },
        methods: {
            getList() {
                this.loading = true;
                let $this = this;
                listShow(this.queryParams).then(response => {
                    let data = response.data;
                    data.forEach(obj => {
                        obj.resultJson = JSON.parse(obj.resultJson);
                        obj.jingJson =  {};
                        obj.standardNum = {};
                        var population= parseInt($this.populationMap[obj.zoneId]);
                        if(isNaN(population)) population = 0
                        let list = $this.standardList;
                        list.forEach(standard => {
                            let standardId = standard.standardId;
                            if(standard.type == 0) {
                                let value = 0;
                                let standardValue = parseFloat(standard.value);
                                if (!isNaN(standardValue)) value = parseInt(population * (standardValue / 10000));
                                obj.standardNum[standardId] = value;  //计算指标
                                $this.standardMap[standardId] = isNaN(standardValue) ? 0 : standardValue;
                                //处理进京访的人口发生数
                                let resultValue = parseInt(obj.resultJson[standardId]);
                                let jingPoint = $this.handleJingFormula(population, resultValue, standardId);
                                obj.jingJson[standardId] = [jingPoint];
                            }
                        })

                    });
                    $this.showList = data;
                    $this.loading = false;
                });
            },
            reset() {
                this.single = true;
                this.getList();
            },
            getstandardList() {
                listStandard({status: 0}).then(response => {
                    this.standardList = response.rows;
                });
            },
            getPopulationList() {
                let $this = this;
                $this.getConfigKey("planning.population.periods").then(response => {
                    $this.initPeriods = response.msg;
                    listPopulation().then(response => {
                        response.rows.forEach(obj => {
                            $this.populationMap[obj.zoneId] = obj.population;
                        })
                    });
                });
            },
            openDialog() {
                this.open = true;
            },
            closeDialog() {
                this.open = false;
            },
            selectOne(row) {// 选中数据
                this.$refs.showTable.setCurrentRow(row);
                this.single = !row;
                this.checketShow = row;
            },
            saveInfo(row) {//保存操作
                let form = {
                    showId: row.showId,
                    zoneId: row.zoneId,
                    year: row.year
                }
                let $this = this;
                getInfoByParm(form).then(response => {
                    this.$modal.confirm('是否确认保存  ' + row.zoneName + '  展示信息？').then(function () {
                        row.resultJson = JSON.stringify($this.resultNumber(row.resultJson));
                        row.jingJson = JSON.stringify($this.jingNumber(row.jingJson));
                        if (response.data) {
                            row.showId = response.data.showId;
                            return updateShow(row);
                        } else {
                            row.showId = null;
                            return addShow(row);
                        }
                    }).then(() => {
                        this.$modal.msgSuccess("保存成功");
                        this.getList();
                        this.single = true;
                        this.checketShow = null;
                    }).catch(() => {
                    });
                })
            },
            load(tree, treeNode, resolve) {
                let form = {
                    zoneId: tree.zoneId,
                }
                getInfoByParm(form).then(response => {
                    let showObj = response.data;
                    if (showObj) {
                        showObj.resultJson = JSON.parse(showObj.resultJson);
                        showObj.jingJson = JSON.parse(showObj.jingJson);
                        showObj.standardNum = {};
                        var population= parseInt(this.populationMap[showObj.zoneId]);
                        if(isNaN(population)) population = 0;
                        let list = this.standardList;
                        list.forEach(standard => {
                            if(standard.type == 0) {
                                let value = 0;
                                let standardValue = parseFloat(standard.value);
                                if (!isNaN(standardValue)) value = parseInt(population * (standardValue / 10000));
                                showObj.standardNum[standard.standardId] = value;
                            }
                        })
                        showObj.auto = false;
                        resolve([showObj]);
                    } else {
                        resolve([]);
                    }
                });
            },
            settingShow(show) {
                let checketShow = this.checketShow;
                if (checketShow) {
                    let form = {
                        showId: checketShow.showId,
                        zoneId: checketShow.zoneId,
                        year: checketShow.year
                    }
                    let $this = this;
                    getInfoByParm(form).then(response => {
                        this.$modal.confirm('是否' + (show === 0 ? '取消' : '设置') + '  ' + checketShow.zoneName + '  地区为大屏展示？').then(function () {
                            checketShow.resultJson = JSON.stringify($this.resultNumber(checketShow.resultJson));
                            checketShow.jingJson = JSON.stringify($this.jingNumber(checketShow.jingJson));
                            checketShow.show = show;
                            if (response.data) {
                                checketShow.showId = response.data.showId;
                                return updateShow(checketShow);
                            } else {
                                checketShow.showId = null;
                                return addShow(checketShow);
                            }
                        }).then(() => {
                            this.$modal.msgSuccess("设置成功");
                            this.getList();
                            this.single = true;
                            this.checketShow = null;
                        }).catch(() => {
                        });
                    })
                }
            },
            limitInputValue(e) {
                let key = e.key;
                if (this.reg.test(key + "") && 'Backspace' !== key && 'Delete' !== key) {
                    e.returnValue = false
                    return false
                }
                return true
            },
            handleNumInput(key, map) {
                let value = map[key];
                let valStr = (value + "").replace(this.reg, '');
                value = handleNumber(valStr, 0);
                map[key] = value;
            },
            handleDecimalInput(key, map) {
                let value = map[key][0];
                let valStr = (value + "").replace(this.reg, '');
                value = handleNumber(valStr, 3);
                map[key] = [value];
            },
            handelPointNumber(value, row, standardId) {//联动计算结果
                let jingPoint = this.handleJingFormula(this.populationMap[row.zoneId], value,standardId);
                row.jingJson[standardId] = [jingPoint];
            },
            handleJingFormula(population, letterNumber,standardId) {//进京访计算公式, population:人口数, letterNumber:信访件数
                population = parseInt(population);
                letterNumber = parseInt(letterNumber);
                let standardValue = this.standardMap[standardId];
                if (isNaN(population) || isNaN(letterNumber) || population === 0 || standardValue === 0) return 0;
                let number = letterNumber / (population * (standardValue / 10000.0));
                return Math.round(number * 100.0) / 100;
            },
            resultNumber(resultJson) {
                if (!resultJson) return resultJson;
                for (let key in resultJson) {
                    let num = parseInt(resultJson[key]);
                    if (isNaN(num)) num = 0;
                    resultJson[key] = num;
                }
                return resultJson;
            },
            jingNumber(jingJson) {
                if (!jingJson) return jingJson;
                for (let key in jingJson) {
                    let arry = jingJson[key];
                    let tem = [];
                    if (arry && arry.length > 0) {
                        arry.forEach(num => {
                            num = parseFloat(num);
                            if (isNaN(num)) num = 0;
                            tem.push(num);
                        })
                    }
                    jingJson[key] = tem;
                }
                return jingJson;
            },
            columnStyle({row, column, rowIndex, columnIndex}){
                let jingId = '';
                const num = 0.8;
                if(columnIndex === 6 || columnIndex === 7) {
                    jingId = this.jingMap.ENTER_JING_VISIT_ID;
                }else if(columnIndex === 9 || columnIndex === 10) {
                    jingId = this.jingMap.ENTER_JING_LETTER_ID;
                }else if(columnIndex === 12 || columnIndex === 13) {
                    jingId = this.jingMap.ENTER_JING_INTERNET_ID;
                }
                if(jingId && row.standardNum[jingId] !== 0) {
                    if (row.resultJson[jingId] <= row.standardNum[jingId] * num)
                        return 'columnStyle2';
                    else if ((row.resultJson[jingId] > row.standardNum[jingId] * num) &&
                        (row.resultJson[jingId] <= row.standardNum[jingId]))
                        return 'columnStyle3';
                    else if (row.resultJson[jingId] > row.standardNum[jingId])
                        return 'columnStyle4';
                }
            }
        }
    };
</script>
<style lang="scss">
    .columnStyle2 {
        input{
            border:0px;
            background:#13ce66;
            color:#ffffff;
        }
    }
    .columnStyle3 {
        input{
            border:0px;
            background:#ffd666;
        }
    }
    .columnStyle4 {
        input{
            border:0px;
            background:#fc6464;
            color:#ffffff;
        }
    }
</style>
