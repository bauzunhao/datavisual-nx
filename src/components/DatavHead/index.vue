<template>
  <div class="head">
    <img src="@/assets/images/general-head.png">
      <p>{{currentDateTime}}</p>
      <div class="nav-bar"  v-if="showTitle">
          <img class="nav-bar__menu" src="@/assets/images/nav-bar__menu.png"></img>
          <img class="nav-bar__home" src="@/assets/images/nav-bar__home.png"></img>
          <div class="nav-bar__system">业务系统</div>
      </div>
  </div>
</template>

<script>
    export default {
        name: "DataV-Head",
        props: {
            showTitle: { type: Boolean, default: true }
        },
        data() {
            return {
                currentDateTime: ""
            };
        },
        created() {
            this.updateDateTime();
        },
        methods: {
            formatDate(time, format){
                if (!time) return '';
                format = format || 'yyyy-MM-dd';
                var t = new Date(time);
                var tf = function(i){return (i < 10 ? '0' : '') + i;};
                var week = function (i) {return ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][i];};
                return format.replace(/yyyy|MM|dd|HH|mm|ss|week/g, function(a){
                    switch(a){
                        case 'yyyy':
                            return tf(t.getFullYear());
                            break;
                        case 'MM':
                            return tf(t.getMonth() + 1);
                            break;
                        case 'mm':
                            return tf(t.getMinutes());
                            break;
                        case 'dd':
                            return tf(t.getDate());
                            break;
                        case 'HH':
                            return tf(t.getHours());
                            break;
                        case 'ss':
                            return tf(t.getSeconds());
                            break;
                        case 'week':
                            return week(t.getDay());
                            break;
                    }
                });
            },
            updateDateTime() {
                setInterval(() => {
                    this.currentDateTime = this.formatDate(new Date(), "yyyy年MM月dd日 HH:mm:ss");
                }, 1000);
            }
        }
    }
</script>

<style scoped lang="scss">
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img{
        height: 110px;
    }
    p {
      position: absolute;
      left: 50px;
      top: 20px;
      font-size: 16px;
        background: linear-gradient(to bottom, #fdfeff, #a1d4ff);
        -webkit-background-clip: text;   /* 背景裁剪成文字形状 */
        -webkit-text-fill-color: transparent; /* 让文字透明，只显示背景 */
      margin: 0;
    }

      .nav-bar{
          position: absolute;
          top: 15px;
          right: 50px;
          display: flex;
          font-size: 16px;
          color: #FFFFFF;
          cursor: pointer;
          line-height: 26px;
          img{
              width: 25px;
              height: 26px;
              margin-right: 15px;
          }
          .nav-bar__system{
              padding: 3px 15px;
              background-image: linear-gradient( 0deg, #104e8f 0%, #024389 100%);
              border-radius: 5px;
          }
      }
  }
</style>
