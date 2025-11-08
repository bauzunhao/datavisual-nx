<template>
    <div class="home" id="publicityv">
        <datavhead></datavhead>
        <div class="cont">
            <div class="sectionleft">
                <div class="sec1-nav">
                    <router-link to="/"><img src="../../../assets/images/general-home.png" alt=""></router-link>
                    <ul>
                        <li @click="openDialong()"><span>导航</span></li>
                        <li><router-link to="/datav/emergency"><span>风险播报</span></router-link></li>
                        <li><router-link to="/datav/linkage"><span>联动指挥</span></router-link></li>
                        <li><router-link to="/datav/publicityv"><span>宣传教育</span></router-link></li>
                    </ul>
                </div>
            </div>
            <div class="sectioncont" style="margin-top: 30px;">
                <h3>宣传图片</h3>
                <div class="swipersl" style="width: 2572px;height: 1000px">
                    <div class="swiper-container" ref="swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="picture in pictureListTop5">
                                <img :src="realImgSrc(picture.videoImageUrl)" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sectionrt">
                <h3>最新上线</h3>
                <div style="margin-bottom: 59px;" class="secryimg" v-for="newVideo in newVideoList">
                    <Video :src="realImgSrc(newVideo.videoAttachments)" :poster="realImgSrc(newVideo.videoImageUrl)"
                           class="avatar video-avatar" controls="controls" controlsList="nodownload" width="720px" height="220px">
                        您的浏览器不支持视频播放
                    </Video>
                    <p>{{newVideo.videoImageName}}</p>
                </div>
            </div>

            <div class="sectdov">
                <h3>宣传视频 <span style="cursor: pointer;margin-left: 20px;font-size: 22px;" @click="queryAllVideo">更多>></span></h3>
                <div style="display: flex;align-items: center;overflow: hidden;justify-content: space-between;">
                    <div class="secryimg text-container" v-for="video in videoListTop10">
                        <Video :src="realImgSrc(video.videoAttachments)" :poster="realImgSrc(video.videoImageUrl)"
                               class="avatar video-avatar" controls="controls" controlsList="nodownload" width="274px" height="110px">
                            您的浏览器不支持视频播放
                        </Video>
                        <p>{{video.videoImageName}}</p>
                    </div>
                </div>
            </div>
        </div>
        <DialogNav ref="DialogNav"></DialogNav>
        <el-dialog
            :visible.sync="queryVisible"
            width="1600px"
            custom-class="detailtable"
            title="宣传视频"
            :before-close="morevisClose">
            <div   style="width: 100%;height: 550px;position: relative;">
                <el-radio-group
                    v-model="queryParams.informationCategory"
                    style="margin-bottom: 30px;"
                    @change="getVideoNameQuery"
                >
                    <el-radio-button label="" >全部</el-radio-button>
                    <el-radio-button :label="dict.value"  v-for="dict in dict.type.information_video_category">{{ dict.label }}</el-radio-button>
                </el-radio-group>
                <div class="diavdo">
                    <div class="secryimg text-container" v-for="video in videoPageList">
                        <Video :src="realImgSrc(video.videoAttachments)" :poster="realImgSrc(video.videoImageUrl)"
                               class="avatar video-avatar" controls="controls" controlsList="nodownload" width="294px" height="110px">
                            您的浏览器不支持视频播放
                        </Video>
                        <p>{{video.videoImageName}}</p>
                    </div>
                </div>
                <pagination
                    v-show="total>0"
                    :total="total"
                    :page.sync="queryParams.pageNum"
                    :limit.sync="queryParams.pageSize"
                    @pagination="getVideoPageListData()"
                />

                <div class="dlinp" >
                    <el-input v-model="queryParams.videoImageName" placeholder="请输入内容"></el-input>
                    <el-button type="primary" @click="getVideoNameQuery()">搜索</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import datavhead from '@/components/DatavHead/index'
import DialogNav from '@/components/DialogNav/index'
import {getPageListData} from '@/api/datav/linkage/videoPicture'
import {isExternal} from "@/utils/validate";
import 'swiper/swiper-bundle.css';
import Swiper, {Autoplay} from 'swiper';
Swiper.use([Autoplay]);

export default {
    name: "publicityv",
    components: {'datavhead': datavhead, 'DialogNav': DialogNav},
    dicts: [ 'information_video_category'],
    data() {
        return {
            activeName: 'video',
            activeName1: 'first',
            activeName2: 'second',
            swiper: null,
            input : '',
            queryVisible : false,
            queryName: null,
            newVideoList: [], //最新上线视频
            videoListTop10: [], // 视频top10
            pictureListTop5: [], //图片top5
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                videoImageName:null,
                informationCategory:'',
                status: 0,
                type: 0,
                largeScreen: 'Y',
            },
            // 总条数
            total: 0,
            videoPageList: [], //更多视频

        }
    },
    mounted() {
        this.getNewVideoDataList(); //最新上线视频
        this.getVideoDataListTop10(); //视频top10
        this.getPictureListTop5(); //图片top5
    },
    methods: {
        openDialong() {
            this.$refs.DialogNav.handldOpen();
        },
        morevisClose(done){
            done()
        },
        initswiper() {
            this.$nextTick(()=>{
                this.swiper = new Swiper(this.$refs.swiper, {
                    loop: true, // 无限滚动
                    slidesPerView: 1,
                    spaceBetween: 30, // 间隔30px
                    centeredSlides: false, // 不居中排列
                    on: {
                        init: function () {
                            this.timer = setInterval(() => {
                                this.slideNext();
                            }, 3000);
                        }
                    }
                });
            })
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        realImgSrc(src) {
            if (!src) {
                return;
            }
            let real_src = src.split(",")[0];
            if (isExternal(real_src)) {
                return real_src;
            }
            return process.env.VUE_APP_BASE_API + real_src;
        },
        getNewVideoDataList() {
            let form = {pageNum: 1, pageSize: 2, largeScreen: 'Y', status: 0, type: 0};
            getPageListData(form).then(response => {
                this.newVideoList = response.rows;
            })
        },
        getVideoDataListTop10() {
            let form = {pageNum: 1, pageSize: 12, largeScreen: 'Y', status: 0, type: 0};
            getPageListData(form).then(response => {
                if(response.rows){
                    for(let i in response.rows) {
                        //去掉最新的2个视频
                        if( i > 1){
                            this.videoListTop10.push(response.rows[i])
                        }
                    }
                }
            })
        },
        getPictureListTop5() {
            let form = {pageNum: 1, pageSize: 5, largeScreen: 'Y', status: 0, type: 1};
            getPageListData(form).then(response => {
                this.pictureListTop5 = response.rows;
                this.initswiper();
            })
        },
        getVideoPageListData() {
            getPageListData(this.queryParams).then(response => {
                this.videoPageList = response.rows;
                this.total = response.total;
            })
        },
        queryAllVideo(){
            this.queryVisible = true;
            this.getVideoPageListData();
        },
        //搜索查询
        getVideoNameQuery(){
            this.getVideoPageListData();
        }
    },
    beforeDestroy() {
        if (this.swiper) {
            // 停止定时器
            if (this.swiper.timer) {
                clearInterval(this.swiper.timer);
            }
            this.swiper.destroy();
        }
    }
}
</script>

<style scoped lang="scss" >
p {
    margin: 0
}

$ft-color: #34d0ff;
@font-face {
    font-family: "DSfont";
    src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
}

$sz-font-family: "DSfont";
.home {

    .cont {
        .sectionleft{
            display: block;
        }
        .sec1-nav img{
            top: -7px;
        }
        .sectioncont{
            display: inline-block;
            width: 2572px;
            .sectionleft {
                display: block;
                .sec1-min {
                    margin-top: 30px;

                    .min1 {
                        height: 190px;
                        width: 350px;
                        background-image: linear-gradient(rgba(14, 97, 162, 0.5) 0%, rgba(0, 31, 66, 0.5) 100%);
                        position: relative;
                        display: inline-block;
                        margin-bottom: 20px;

                        p:nth-child(1) {
                            font-size: 30px;
                            color: $ft-color;
                            padding: 15px 25px 10px;

                            span {
                                color: white;
                                font-size: 18px;
                                background-color: #137c9f;
                                border-radius: 10px;
                                padding: 2px 10px;
                                float: right;
                                vertical-align: bottom;
                                margin-top: 10px;
                            }
                        }

                        p:nth-child(2) {
                            font-family: $sz-font-family;
                            font-size: 52px;
                            color: #f9686f;
                            padding-left: 25px;
                        }

                        p:nth-child(3) {
                            padding-left: 25px;
                            font-size: 18px;
                            color: #c0c0c0;

                            span {
                                margin-left: 60px;
                            }
                        }

                        p:nth-child(4) {
                            position: absolute;
                            bottom: 0;
                            font-size: 18px;
                            color: $ft-color;
                            display: flex;
                            width: 100%;

                            span {
                                display: block;
                                width: 100%;
                                text-align: center;
                                border-bottom: 2px solid;
                                margin-right: 5px;
                                line-height: 35px;
                            }

                            span:nth-child(1) {
                                border-image: linear-gradient(90deg, rgba(2, 43, 82, 1) 0%, rgba(1, 93, 156, 1) 100%, rgba(3, 24, 56, 1) 100%) 1;
                            }

                            span:nth-child(2) {
                                border-image: linear-gradient(90deg, rgba(9, 51, 72, 1) 0%, rgba(19, 102, 102, 1) 100%) 1;
                            }

                            span:nth-child(3) {
                                border-image: linear-gradient(90deg, rgba(36, 37, 65, 1) 0%, rgba(128, 66, 87, 1) 100%) 1;
                            }
                        }
                    }

                    .min1:nth-child(even) {
                        margin-right: 20px;
                    }

                    .min1:nth-child(3) {
                        p:nth-child(2) {
                            color: #ebda55
                        }
                    }

                    .min1:nth-child(4) {
                        p:nth-child(2) {
                            color: #1ad385
                        }
                    }

                    .min1:nth-child(5) {
                        p:nth-child(2) {
                            color: $ft-color
                        }
                    }
                }

                .sec2-min {
                    .secrt-0 {
                        height: 160px;
                        width: 100%;
                        display: flex;
                        flex-wrap: nowrap;
                        align-content: center;
                        justify-content: space-between;
                        align-items: center;
                        background-size: 100% 100%;

                        .secrt-0li {
                            display: flex;
                            align-items: center;

                            .secrt-0chart {
                                height: 160px;
                                width: 160px;
                            }

                            p {
                                font-size: 22px;
                                margin: 0;
                                color: $ft-color;
                            }
                        }

                    }

                    .secrt-1chart {
                        height: 170px;
                        width: 220px;
                        display: inline-block;
                    }

                    .secrt-1li {
                        display: inline-block;
                        width: 510px;
                        height: 180px;
                        vertical-align: top;
                        color: $ft-color;

                        ul {
                            margin: 0;
                            padding: 0 10px 0 40px;

                            li {
                                list-style: none;
                                position: relative;
                                //list-style-type: square;
                                p {
                                    margin: 0;
                                    line-height: 30px;
                                    display: flex;
                                    flex-direction: row;
                                    flex-wrap: nowrap;
                                    align-content: center;
                                    justify-content: space-between;
                                    align-items: center;
                                    width: 100%;
                                    font-size: 22px;

                                    span {
                                        width: 80px;
                                        white-space: nowrap;
                                    }
                                }
                            }

                            li:after {
                                content: '';
                                border: 5px solid;
                                position: absolute;
                                left: -20px;
                                top: 13px;
                                //['#ec5d51', '#59abe1', '#f4cf42', '#3dc6a8','#FFCC67']
                                border-color: #ec5d51;
                            }

                            li:nth-child(2):after {
                                border-color: #59abe1;
                            }

                            li:nth-child(3):after {
                                border-color: #f4cf42;
                            }

                            li:nth-child(4):after {
                                border-color: #3dc6a8;
                            }

                            li:nth-child(5):after {
                                border-color: #FFCC67;
                            }
                        }
                    }
                }
            }
            .swipersl {
                display: inline-block;
                overflow: hidden;
                vertical-align: top;
                img{
                    width: 100%;
                    height: 100%;
                }
            }

            .swiper-container {
                width: 100%;
                height: 100%;
            }
        }
        .sectionrt{
            display: inline-block;
            width: 968px;
            position: relative;
            padding-left: 100px;
            vertical-align: top;
            height: 100px;
            margin-top: 30px;
            .el-input{
                display: inline-block;
                width: 200px;
            }
            .el-input__inner {
                background: #032144;
                border: 0;
                width: 200px;
                input::-webkit-input-placeholder {
                    color: #82848a;
                }
            }
            .el-button--medium{
                display: inline-block;
                margin-left: 20px;
            }
            .secryimg{
                Video{
                    width: 100%;height: 400px;
                }
                p{
                    color: #34d0ff;
                    font-size: 32px
                }
            }
        }
        .sectdov{
            margin-top: 15px;
            .secryimg{
                width: 274px;
                Video{
                    height: 380px;
                }
                p{
                    color: #34d0ff;
                    font-size: 32px
                }
            }
        }
    }
    .secryimg.text-container{
        p{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}



</style>

<style lang="scss">
#publicityv{
    .el-tabs__item{
        color: white;
        font-size: 26px;
    }
    .el-tabs__content {
            .el-tab-pane{
                height: 436px;
                display: flex;
                -webkit-box-pack: start;
                -ms-flex-pack: start;
                justify-content: space-between;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
                align-content: space-around;
                .secryimg{
                    margin-right: 20px;
                    margin-bottom: 20px;
                    img{
                        width: 225px;
                    }
                    p{
                        color: #34d0ff;
                        font-size: 22px
                    }
                }

            }

    }
    .dlinp{
        position: absolute;top: 0;right: 0;width: 300px;
        .el-input{
            display: inline-block;
            width: 200px;
        }
        .el-input__inner {
            background: #032144;
            border: 0;
            width: 200px;
            input::-webkit-input-placeholder {
                color: #82848a;
            }
        }
        .el-button--medium{
            display: inline-block;
            margin-left: 20px;
        }
    }
    .pagination-container{
        background: none;
    }
    .diavdo{
        height: 400px;
        display: flex;
        flex-wrap: wrap;
        align-content: space-around;
        justify-content: flex-start;
        align-items: center;
        .text-container{
            width: 280px;
            margin-right: 30px;
            p{
                color: #34d0ff;
                font-size: 24px;
            }
        }
    }
}

.sectionrt .el-input--medium .el-input__inner{
    background: #032144;
    border: 0;
    width: 200px;
}
.pagination-container{
    background-color:transparent;
}

.text-container {
    width: 242px; /* 设置容器宽度 */
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis; /* 溢出用省略号表示 */
    border: 1px solid #000; /* 为了清楚展示效果，加上边框 */
}
</style>
