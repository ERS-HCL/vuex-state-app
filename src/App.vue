<template>
  <div id="app">
    <div class="menu">
      <router-link to="/sample1" tag="button" class="link">BASIC CRUD</router-link>
      <router-link to="/books" tag="button" class="link">BOOKS SAMPLE</router-link>
      <router-link to="/about" tag="button" class="link about">About</router-link>
    </div>
  <div class="home">
    <router-view/>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans|Nunito');
#app {
  font-family: 'Nunito', 'Fira Sans', sans-serif;
}
.menu {
  justify-content: center;
  align-items: center;
  -ms-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  border: none;
  padding: 10px;
  background: black;
  box-shadow: 0 3px 3px lightgrey;
  margin-bottom: 10px;
  outline: none;
}
.menu button {
  margin-top: 5px;
  padding: 8px;
  border-radius: 25px;
  background: white;
  box-shadow: 0 0 0.5px lightgrey;
  margin-bottom: 8px;
  margin-left: 1rem;
}

.menu button:hover {
  background: #ff0076;
  color: white;
}

.link {
  text-transform: uppercase;
  font-size: 0.8em;
  background: #f9d0e3;
  border: none;
  padding: 5px;
  color: #ff0076;
  cursor: pointer;
}

.about {
  position: absolute;
  right: 1.5rem;
}
</style>

