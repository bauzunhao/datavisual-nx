
<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class=" score-table">
                <table border="1" cellspacing="0" cellpadding="6" style="width: 100%; text-align: center; border-collapse: collapse; color: #fff; background-color: #335ddd;">
                    <thead>
                    <tr>
                        <th class="table-title" colspan="17">2024年信访工作考核成绩</th>
                    </tr>
                    <tr>
                        <th rowspan="2">序号</th>
                        <th rowspan="2">地市</th>
                        <th rowspan="2">总得分</th>
                        <th colspan="2">预防法执法（8分）</th>
                        <th colspan="3">受理法治化（15分）</th>
                        <th colspan="5">办理法治化（27分）</th>
                        <th colspan="2">监督追责法治化（10分）</th>
                        <th colspan="2">维护秩序法治化（10分）</th>
                    </tr>
                    <tr>
                        <th>矛盾纠纷</th>
                        <th>政...</th>

                        <th>信及时受理</th>
                        <th>责受理率</th>
                        <th>应受理未受理</th>
                        <th>调解</th>
                        <th>信访事项处理</th>
                        <th>复查</th>
                        <th>复核</th>
                        <th>其它途径</th>
                        <th>监督问责</th>
                        <th>政务公开</th>
                        <th>维稳措施</th>
                        <th>法治宣传</th>
                    </tr>
                    </thead>
                    <!-- 内容 -->
                    <tbody>
                    <tr v-for="(item, index) in tableData" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.city }}</td>
                        <td>{{ item.score }}</td>
                        <td>{{ item.a1 }}</td>
                        <td>{{ item.a2 }}</td>
                        <td>{{ item.a3 }}</td>
                        <td>{{ item.b1 }}</td>
                        <td>{{ item.b2 }}</td>
                        <td>{{ item.b3 }}</td>
                        <td>{{ item.c1 }}</td>
                        <td>{{ item.c2 }}</td>
                        <td>{{ item.c3 }}</td>
                        <td>{{ item.c4 }}</td>
                        <td>{{ item.c5 }}</td>
                        <td>{{ item.d1 }}</td>
                        <td>{{ item.d2 }}</td>
                        <td>{{ item.e1 }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div class="rdwt">
                <h4>2024年各地市考核成绩 </h4>
                <div>
                    <RdwtChart
                        ref="chart"
                        :data-name="cityNames"
                        :data-value="cityValues"
                        height="320px"
                        :bar-width="22"
                    />
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import Vue from "vue";
import DatavHead from "@/components/DatavHead/index.vue";
import RdwtChart from '@/components/BarChart/index.vue'

export default Vue.extend({
    components: { RdwtChart, DatavHead},
    data (){
        return{
            tableData : [
                { city: '银川市', score: 90, a1: 2, a2: 3, a3: 4, b1: 5, b2: 6, b3: 7, c1: 8, c2: 9, c3: 10, c4: 11, c5: 12, d1: 13, d2: 14, e1: 15, e2: 16 },
                { city: '石嘴山市', score: 85, a1: 3, a2: 4, a3: 5, b1: 5, b2: 7, b3: 6, c1: 9, c2: 10, c3: 11, c4: 12, c5: 13, d1: 14, d2: 15, e1: 16, e2: 17 },
                { city: '吴忠市', score: 88, a1: 4, a2: 5, a3: 3, b1: 6, b2: 5, b3: 7, c1: 9, c2: 11, c3: 12, c4: 13, c5: 14, d1: 15, d2: 16, e1: 17, e2: 18 },
                { city: '固原市', score: 82, a1: 3, a2: 4, a3: 4, b1: 6, b2: 6, b3: 5, c1: 8, c2: 9, c3: 10, c4: 11, c5: 12, d1: 13, d2: 14, e1: 15, e2: 16 },
                { city: '中卫市', score: 87, a1: 4, a2: 5, a3: 6, b1: 6, b2: 6, b3: 6, c1: 9, c2: 10, c3: 11, c4: 12, c5: 13, d1: 14, d2: 15, e1: 16, e2: 17 },
            ],
            cityNames: ['拉萨市', '日喀则市', '山南市', '林芝市', '昌都市', '那曲市', '阿里地区'],
            cityValues: [78, 68, 49, 37, 28, 24, 15]
        }
    }
})
</script>

<style scoped lang="scss">
.table-title{
    font-size: 32px;
}
/* 表格基础 */
.score-table{
    width: max(1200px, 100%);
    border-collapse: collapse;
    height: 500px;
    overflow: auto;
    color: #fff;
    font-size: 16px;
    table-layout: fixed;
    border: 1px solid rgba(28, 24, 11, 0.4);
    caption{
        caption-side: top;
        color: #a5c8ff;
        font-size: 22px;
        padding: 10px 0 6px;
        letter-spacing: 1px;
    }
    thead th{
        color: #e6f1ff;
        font-weight: 600;

    }

}
.score-table th,
.score-table td{
    border: 1px solid rgba(0,170,255,.35);
    text-align: center;
    padding: 8px 6px;
    white-space: nowrap;
    font-size: 16px;
}
.rdwt{
    width: 100%;
    height: 370px;
    padding: 10px;
    margin-top: 25px;
    background: linear-gradient(180deg, rgba(0, 61, 136, 0.3) 0%, rgba(0, 29, 65, 0.1) 51%, rgba(0, 61, 136, 0.3) 100%);
    border-radius: 10px;
}

</style>
