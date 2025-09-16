// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
// import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js"

import { createApp } from "vue"
import "@hotwired/turbo-rails"
import "controllers"
// import GameApp from "./games"

document.addEventListener("turbo:load", () => {
  createApp(GameApp).mount('#app')
})
