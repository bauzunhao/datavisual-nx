<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="sectionleft">
                <div class="leftlist">
                    <div class="corner corner-tl"></div>
                    <div class="corner corner-tr"></div>
                    <div class="corner corner-bl"></div>
                    <div class="corner corner-br"></div>
                    <p> 交换文件数量</p>
                    <p>交换及时率</p>
                </div>
                <div class="leftlist">
                    <div class="corner corner-tl"></div>
                    <div class="corner corner-tr"></div>
                    <div class="corner corner-bl"></div>
                    <div class="corner corner-br"></div>
                    <p>拉萨：10家单位</p>
                    <p>山南：10家单位</p>
                    <p>阿里地区：10家单位</p>
                </div>
            </div>
            <div class="section">
                <img src="@/assets/images/datacenter.png" alt="">
            </div>

            <div class="sectionright">
                <div class="leftlist">
                    <div class="corner corner-tl"></div>
                    <div class="corner corner-tr"></div>
                    <div class="corner corner-bl"></div>
                    <div class="corner corner-br"></div>
                    <p> 交换文件数量</p>
                    <p>交换及时率</p>
                </div>
                <div class="leftlist">
                    <div class="corner corner-tl"></div>
                    <div class="corner corner-tr"></div>
                    <div class="corner corner-bl"></div>
                    <div class="corner corner-br"></div>
                    <p>拉萨：10家单位</p>
                    <p>山南：10家单位</p>
                    <p>阿里地区：10家单位</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import DatavHead from '@/components/DatavHead/index.vue'
export default {
    name: 'index',
    components: { DatavHead },
}
</script>

<style scoped lang="scss">

.cont{
    .sectionleft , .sectionright{
        width: 385px;
        margin-top: -20px;

        .leftlist{
            height: 430px;
            position: relative;
            background: rgba(0, 156, 255, 0.01);
            margin-bottom: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: #34d0ff;
            .corner {
                position: absolute;
                width: 20px;
                height: 20px;
                border: 3px solid #34d0ff;
            }

            // 四个角
            .corner-tl {
                top: 0;
                left: 0;
                border-right: none;
                border-bottom: none;
            }

            .corner-tr {
                top: 0;
                right: 0;
                border-left: none;
                border-bottom: none;
            }

            .corner-bl {
                bottom: 0;
                left: 0;
                border-right: none;
                border-top: none;
            }

            .corner-br {
                bottom: 0;
                right: 0;
                border-left: none;
                border-top: none;
            }
        }
    }
    .sectionleft{
        width: 428px;
        margin-right: 10px;
    }
    .sectionright{
        width: 415px;
        margin-left: 10px;
    }
    .section{
        margin-top: -22px;
        width: 948px;
        height: 970px;
        display: inline-block;
    }
}
</style>
