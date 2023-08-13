<template>
  <section>
    <h2><a href="/#/form-with-tab">From With Tab</a></h2>
    <p>
      하위 컴포넌트의 양식을 이용해서 데이터 값을 변경 받거나 변경함. 데이터를
      생성, 수정시 사용
    </p>
  </section>
  <section>
    <h2><a href="http://s3.skyred.cloud">vue-front</a></h2>
    <p>이전에 Vue2로 만든 페이지</p>
  </section>
  <section>
    <h2><a href="/#/genshin-impact">원신</a></h2>
    <p>원신 관련 내가 좋아하는 유튜브 동영상 목록</p>
  </section>
  <section>
    <h2><a href="/#/real-estate">부동산</a></h2>
    <p>부동산 관련 내가 좋아하는 유튜브 동영상 목록</p>
  </section>
</template>
<script setup lang="ts"></script>
<style scoped>
section:not(:last-of-type) {
  margin-bottom: 32px;
}
</style>
