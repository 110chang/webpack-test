
import $ from 'jquery'

export default function (msg) {
  $('body').append(`[print] ${msg} dayo.`).css('color', '#F60')
}
