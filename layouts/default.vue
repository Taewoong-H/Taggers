<template>
  <div data-app>
    <header>
      <h1 class="header">
        <n-link to="/">Taggers 광고 상품 표</n-link>
      </h1>
    </header>

    <nuxt />
  </div>
</template>


<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");
html {
  font-family: "Poppins", sans-serif;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

header {
  position: relative;
  width: 100%;
  height: 20vh;
}

header .header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

header .header a {
  text-decoration: none;
  color: #333;
  font-size: 40px;
}
</style>
