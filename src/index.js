import {
  API_URL,
  log
} from './js/common'

import $ from 'jquery'
import Swiper from 'swiper'

console.log('app init')
log(API_URL)

$(document).ready(function () {
  console.log('dom ready!')

  const mySwiper = new Swiper('.swiper-container', {
    autoplay: false,
    loop: false,
    initialSlide: 0,
    direction: 'vertical',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    on: {
      init: function () {
        console.log('mySwiper init')
        console.log('current slide: ', this.activeIndex)
        // 在初始化时触发一次transitionEnd事件
        this.emit('transitionEnd')
      }
    }
  })
  console.log('swiper:', mySwiper)
  mySwiper.on('slideChange', function () {
    console.log('current slide: ', this.activeIndex)
  })

  let box1 = document.getElementById('box1')
  let box2 = document.getElementById('box2')

  box1.innerHTML = '<img src="' + require('./assets/img/icon.png') + '" alt="" />'
  box2.innerHTML = '<img src="' + require('./assets/img/2.jpg') + '" alt="" />'

  $('h1').css('color', '#d33')
})