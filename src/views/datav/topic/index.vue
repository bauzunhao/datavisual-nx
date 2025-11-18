<template>
    <div class="home">
        <DatavHead />
        <div class="cont">
            <div class="section">
                <img class="topic-arc-left" src="../../../assets/images/topic-arc.png" alt="">
                <img class="topic-arc-right" src="../../../assets/images/topic-arc.png" alt="">
                <router-link to="/datav/TopicTemplate"
                             v-for="(item, idx) in topicList"
                             :key="idx">
                    <div class="topic-item">
                            <div class="topic-item-icon">

                            </div>
                            <p>{{ item }}</p>
                    </div>
                </router-link>

                <router-link to="/datav/Topsearch">
                    <div class="topic-item">
                        <div class="topic-item-icon">

                        </div>
                        <p>信访智能搜索</p>
                    </div>
                </router-link>

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
    data(){
        return {
            topicList :[
                            "新就业群体专题",
                            "城乡建设专题",
                            "劳动和社会保障专题",

                            "政法专题",
                            "农村农业专题",
                            "教育专题",

                            "涉军专题",
                            "卫生健康专题",
                            "涉及经济专题",

                            "妇女儿童专题",
                            "市场监管专题",
                    ]

    }
    }
}
</script>

<style scoped lang="scss">
.home{
    .cont{
        .section{
            position: relative;
            padding: 200px 10% 0 10%;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(3, 1fr); // 每行三个
            gap: 30px 40px;  // 行间距30，列间距40，自行调
            width: 100%;
            .topic-arc-left{
                position: absolute;
                left: 60px;
                top: 0;
            }
            .topic-arc-right{
                position: absolute;
                right: 60px;
                top: 0;
                transform: rotateY(180deg);
            }
            .topic-item{
                background: url("../../../assets/images/topic-item.png") no-repeat;
                width: 467px;
                height: 95px;
                display: flex;
                .topic-item-icon{
                    height: 100%;
                    width: 60px;
                }
                p{
                    padding-left: 120px;
                    font-size: 26px;
                    font-weight: bold;
                    background: linear-gradient(to bottom, #fdfeff, #a1d4ff);
                    -webkit-background-clip: text;   /* 背景裁剪成文字形状 */
                    -webkit-text-fill-color: transparent; /* 让文字透明，只显示背景 */
                }
                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 0 5px rgba(0,120,255,0.4);
                    cursor: pointer;
                    background: url("../../../assets/images/topic-item-active.png") no-repeat;
                    p{
                        background: linear-gradient(to bottom, #fff9d1, #ffed75);
                        -webkit-background-clip: text;   /* 背景裁剪成文字形状 */
                        -webkit-text-fill-color: transparent; /* 让文字透明，只显示背景 */
                    }
                }

            }
        }
    }
}
</style>

