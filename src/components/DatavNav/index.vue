<template>
  <div class="sec1-nav">
    <img src="../../assets/images/general-home.png" alt="">
    <ul>
      <li><span>导航</span></li>
      <li><span>信访概览</span></li>
      <li><span>办理情况</span></li>
      <li><span>绩效分析</span></li>
      <li><span>突出矛盾</span></li>
    </ul>
  </div>
</template>

<script>
export default {
name: "index",
}
</script>

<style scoped lang="scss">
$ft-color: #1aa1c5;
.sec1-nav {
  height: 47px;
ul {
  text-align: right;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-end;
  align-items: center;
li {
  font-size: 24px;
  /* margin: 0px; */
  padding: 0 22px;
  color: $ft-color;
  list-style: none;
  border-left: 1px solid $ft-color;
  cursor: pointer;
}
li:first-child {
  border-left: 0;
}
}
img{
  position: absolute;
  top: 10px;
  left: 0;
}
}
</style>
