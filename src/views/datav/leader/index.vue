<template>
    <div class="home">
        <datavhead></datavhead>
        <div class="cont">
            <div class="contleft">
                <div class="sec1-nav">
                    <router-link to="/"><img src="../../../assets/images/general-home.png" alt=""></router-link>
                    <ul>
                        <li @click="openDialong()"><span>导航</span></li>
                        <li>
                            <router-link to="/datav/leader"><span>领导包案</span></router-link>
                        </li>
                        <li>
                            <router-link to="/datav/priorities"><span>接访下访</span></router-link>
                        </li>
                        <li>
                            <router-link to="/datav/focusmatter"><span>重点事项</span></router-link>
                        </li>
                        <li>
                            <router-link to="/datav/example"><span>示范区县</span></router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="section">
                <div class="section-head">
                    <h3>领导包案</h3>
                    <ul>
                        <li v-for="leader in receptionInfo.leaderList">
                            <el-image v-if ="receptionInfo.profile && leader.portrait" :src="realImgSrc(leader.portrait)" fit="cover"></el-image>
                            <el-image v-if="receptionInfo.profile && !leader.portrait" :src="require('../../../assets/images/profile.jpg')" fit="cover"></el-image>
                            <div>
                                <h4 class="ft30" v-text="leader.leaderName"></h4>
                                <p class="ft26" v-text="leader.duties"></p>
                                <p class="ft24" v-text="leader.introduction"></p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="sectionleft">
                    <el-image style="width: 100%;margin-bottom: 70px;" :src="require('../../../assets/images/daravleader2.png')" fit="contain "></el-image>
                    <h3>包案进行时</h3>
                    <div class="leftov">
                        <div class="secleft" v-for="petition in petitionList">
                            <router-link :to="{path:'leaderdetails', query:{petitionId: petition.petitionId}}">
                                <div class="secleft1">
                                    <p><span>{{petition.letterName}}</span><i class="el-icon-location"></i>{{petition.letterZoneName}}</p>
                                </div>
                                <div class="secleft2">
                                    <p v-text="petition.letterTypeName"></p>
                                    <p v-text="petition.contentTypeName"></p>
                                    <p v-text="petition.registerTime"></p>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="sectioncont">
                    <div class="mabt70">
                        <div class="contlist">
                            <div class="contlist1">
                                <div class="contmin" v-for="(dict, index) in dict.type.datav_leader_workflow_list" v-if="index === 0">
                                    <p>{{dict.label}}</p>
                                    <p>{{dict.value}}</p>
                                </div>
                                <div class="contil">
                                    <p>1</p>
                                </div>
                            </div>
                            <div class="contlist1 contlist2">
                                <div class="contil">
                                    <p>4</p>
                                </div>
                                <div class="contmin" v-for="(dict, index) in dict.type.datav_leader_workflow_list" v-if="index === 3">
                                    <p>{{dict.label}}</p>
                                    <p>{{dict.value}}</p>
                                </div>

                            </div>
                        </div>
                        <div class="contlist">
                            <div class="contlist1">
                                <div class="contmin"  v-for="(dict, index) in dict.type.datav_leader_workflow_list" v-if="index === 1">
                                    <p>{{dict.label}}</p>
                                    <p>{{dict.value}}</p>
                                </div>
                                <div class="contil">
                                    <p>2</p>
                                </div>
                            </div>
                            <div class="contlist1 contlist2">
                                <div class="contil">
                                    <p>5</p>
                                </div>
                                <div class="contmin"  v-for="(dict, index) in dict.type.datav_leader_workflow_list" v-if="index === 4">
                                    <p>{{dict.label}}</p>
                                    <p>{{dict.value}}</p>
                                </div>

                            </div>
                        </div>
                        <div class="contlist">
                            <div class="contlist1">
                                <div class="contmin"  v-for="(dict, index) in dict.type.datav_leader_workflow_list" v-if="index === 2">
                                    <p>{{dict.label}}</p>
                                    <p>{{dict.value}}</p>
                                </div>
                                <div class="contil">
                                    <p>3</p>
                                </div>
                            </div>
                            <div class="contlist1 contlist2">
                                <div class="contil">
                                    <p>6</p>
                                </div>
                                <div class="contmin"  v-for="(dict, index) in dict.type.datav_leader_workflow_list" v-if="index === 5">
                                    <p>{{dict.label}}</p>
                                    <p>{{dict.value}}</p>
                                </div>

                            </div>
                        </div>
                        <img class="daravleader1" src="../../../assets/images/daravleader1.png" alt="">
                        <p class="daravleaderp">{{workflow.name}}</p>
                    </div>
                    <div class="sectionimg">
                        <h3>包案现场</h3>
                        <div class="simglist">
                            <img v-for="photo in visibleItems" v-if="photo.regular" :src="realImgSrc(photo.fileName)"
                                 alt=""/>
                            <div class="swipersl" :style="{width: 2570-(visibleItems.length*415)+'px'}">
                                <div class="swiper-container" ref="swiper">
                                    <div class="swiper-wrapper">
                                        <div v-for="photo in visibleItemregu" class="swiper-slide">
                                            <img :src="realImgSrc(photo.fileName)" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
        <DialogNav ref="DialogNav"></DialogNav>
    </div>
</template>

<script>
    import DialogNav from '@/components/DialogNav/index'
    import datavhead from '@/components/DatavHead/index'
    import {getLeaderInfo, getLeaderPhoto, getLeaderPetitionList} from '@/api/datav/priorities/leader'
    import {getName} from '@/api/system/dict/type'
    import {isExternal} from "@/utils/validate";
    import 'swiper/swiper-bundle.css';
    import Swiper, {Autoplay} from 'swiper';

    Swiper.use([Autoplay]);

    export default {
        name: "leader",
        dicts: ['datav_leader_workflow_list'],
        data() {
            return {
                swiper: null,
                petitionList: [],
                receptionInfo: {
                    profile: true,
                    defaultProfile: '../../../assets/images/profile.jpg',
                    leaderList: []
                },
                leaderPhoto: [],
                workflow:{
                    name: '',
                }
            }
        },
        components: {'DialogNav': DialogNav, 'datavhead': datavhead,},
        created() {
            this.getDictType();
            this.loadConfig();
            this.getLeaderList();
            this.getPetitionList();
            this.getPhoto();
        },
        methods: {
            initswiper() {
                this.swiper = new Swiper(this.$refs.swiper, {
                    loop: true, // 无限滚动
                    slidesPerView: 5 - this.visibleItems.length,  // 一次显示5个slides
                    spaceBetween: 30, // 间隔30px
                    centeredSlides: false, // 不居中排列
                    on: {
                        init: function () {
                            if (this.slides.length > 3) {
                                this.timer = setInterval(() => {
                                    this.slideNext();
                                }, 2000);
                            }
                        }
                    }
                });

            },
            openDialong() {
                this.$refs.DialogNav.handldOpen();
            },
            getLeaderList() {
                let form = {pageNum: 1, pageSize: 5, leaderType: null};
                getLeaderInfo(form).then(response => {
                    this.receptionInfo.leaderList = response.rows;
                })
            },
            getPetitionList() {
                let form = {pageNum: 1, pageSize: 5};
                getLeaderPetitionList(form).then(response => {
                    this.petitionList = response.rows;
                })
            },
            loadConfig() {
                this.getConfigKey("sys.leader.photo.show").then(response => {
                    this.receptionInfo.profile = "1" === response.msg;
                });
            },
            getPhoto() {
                let form = {pageNum: 1, pageSize: 10, photoType: 0, show: true};
                getLeaderPhoto(form).then(response => {
                    this.leaderPhoto = response.rows;
                    this.$nextTick(() => {
                        this.initswiper()
                    })
                })
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
            getDictType(){
                getName('datav_leader_workflow_list').then(response => {
                    this.workflow.name = response.msg;
                })
            },
        },
        computed: {
            visibleItems() {
                return this.leaderPhoto.filter(item => item.regular);
            },
            visibleItemregu() {
                return this.leaderPhoto.filter(item => !item.regular);
            },
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

<style scoped lang="scss">
    p {
        margin: 0
    }

    .colorred {
        color: #fb686f
    }

    .colorgreen {
        color: #1ad485
    }

    .coloryel {
        color: #ebda55
    }

    $ft-yel: #ebda55;
    $ft-color: #34d0ff;
    @font-face {
        font-family: "DSfont";
        src: url(~@/assets/font/DS-DIGIB-2.TTF) format("truetype");
    }

    $ye-color: #ebda55;
    $sz-font-family: "DSfont";

    .home {
        .cont {
            .contleft{
                position: relative;
                .sec1-nav img{
                    top: -7px;
                }
            }
            .section {
                .section-head {
                    margin-top: 30px;
                }


                ul {
                    list-style: none;
                    height: 440px;
                    padding: 0;
                    overflow: hidden;
                    display: grid;
                    grid-template-columns: repeat(7, 580px);
                    grid-gap: 30px;
                    li {
                        //width: 590px;
                        height: 100%;
                        min-width: 200px;
                        display: flex;
                        img {
                            width: 330px;
                            height: 100%;

                        }

                        div {
                            display: inline-block;
                            width: 100%;
                            height: 100%;
                            vertical-align: top;
                            color: $ft-color;
                            font-size: 18px;
                            text-align: right;
                            padding: 10px 15px;
                            background-color: rgba(25, 54, 98, 0.38);

                            h4 {
                                margin: 0;
                            }

                            p:first-child {
                                margin-top: 5px;
                            }

                            p:last-child {
                                color: #a4a8ad;
                                margin-top: 30px;
                                overflow: hidden;
                                display: -webkit-box;
                                text-overflow: ellipsis;
                                line-height: 30px;
                                max-height: 280px;
                            }
                        }
                    }
                }

                .sectionleft {
                    width: 968px;
                    display: inline-block;

                    .leftov {
                        overflow: auto;
                        height: 460px;
                    }

                    .leftov::-webkit-scrollbar-track {
                        background-color: #122a4e;
                    }

                    .leftov::-webkit-scrollbar-thumb {
                        background-color: #1379ca;
                    }

                    .secleft {
                        height: 120px;
                        padding: 0 15px;
                        margin-bottom: 20px;
                        background-image: linear-gradient(0deg, rgba(20, 126, 155, 0), rgba(20, 126, 155, .2));
                        a{display: block;}
                        .secleft1 {
                            line-height: 100px;
                            color: $ft-color;
                            font-size: 24px;
                            display: inline-block;
                            p{
                                width: 315px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                span {
                                    font-size: 32px;
                                    display: inline-block;
                                    width: 105px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    vertical-align: middle;
                                }

                                i {
                                    color: #c95d6b;
                                    margin: 0 5px;
                                }
                            }

                        }

                        .secleft2 {
                            float: right;
                            text-align: right;
                            color: $ft-color;

                            p {
                                margin-top: 5px;
                            }

                            p:first-child {
                                color: white;
                                background: #c95d6b;
                                display: inline-block;
                                border-radius: 25px;
                                padding: 0 10px;
                                height: 30px;
                                line-height: 30px;
                                font-size: 22px;
                            }

                            p:nth-child(2) {
                                font-size: 30px;
                                width: 380px;
                                overflow: hidden;
                                height: 45px;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }

                            p:last-child {
                                color: rgb(131, 131, 131);
                                font-size: 22px;
                            }
                        }
                    }
                }

                .sectioncont {
                    width: 2572px;
                    margin-left: 100px;
                    vertical-align: top;
                    display: inline-block;
                    position: relative;

                    .daravleader1 {
                        position: absolute;
                        top: -2px;
                        left:1027px;
                        z-index: 1;
                        height: 460px;
                    }

                    .daravleaderp {
                        position: absolute;
                        top: -2px;
                        left: 1027px;
                        height: 460px;
                        width: 518px;
                        color: white;
                        font-size: 52px;
                        font-weight: bold;
                        text-align: center;
                        z-index: 2;
                        line-height: 460px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }

                    .contlist {
                        background: rgba(7, 84, 130, .2);
                        height: 150px;
                        margin-bottom: 7px;

                        .contlist1 {
                            width: 50%;
                            text-align: right;
                            padding: 35px 50px;
                            display: inline-block;
                            padding-right: 260px;

                            .contil {
                                background: #00bcf0;
                                border-radius: 50%;
                                display: inline-block;
                                height: 80px;
                                width: 80px;
                                text-align: center;
                                overflow: hidden;

                                p {
                                    line-height: 80px;
                                    background-image: linear-gradient(to top, #12416f, #076998);
                                    -webkit-background-clip: text;
                                    color: transparent;
                                    display: inline-block;
                                    font-size: 60px;
                                    font-weight: 900;
                                }
                            }

                            .contmin {
                                display: inline-block;
                                color: $ft-color;
                                font-size: 22px;
                                padding-right: 25px;

                                p {
                                    width: 660px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }

                                p:first-child {
                                    font-size: 32px;
                                    color: white;
                                    margin-bottom: 10px;
                                }
                            }
                        }

                        .contlist2 {
                            text-align: left;
                            padding-right: 0;
                            padding-left: 260px;

                            .contmin {
                                padding-left: 25px;
                                padding-right: 0;
                            }
                        }
                    }

                    .contlist:nth-child(2) {
                        .contlist1 {
                            padding-right: 300px;
                        }

                        .contlist2 {
                            padding-left: 300px;
                            padding-right: 0;
                        }
                    }

                    .sectionimg {
                        margin-top: 5px;
                        vertical-align: top;
                        display: inline-block;
                        width: 100%;
                        overflow: hidden;

                        .simglist {
                            height: 460px;

                            .swipersl {
                                display: inline-block;
                                overflow: hidden;
                                vertical-align: top;
                            }

                            .swiper-container {
                                width: 100%;
                                height: 460px;
                                display: inline-block;
                            }

                            img {
                                width: 385px;
                                height: 100%;
                                margin-right: 30px;
                            }
                        }
                    }
                }

            }
        }
    }
</style>
