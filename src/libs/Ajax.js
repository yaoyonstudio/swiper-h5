import $ from 'jquery'

export default function (url, method, params, fn, errFn) {
  return $.ajax({
    url: url,
    type: method,
    data: params,
    success: function (res) {
      fn(res)
    },
    error: function (error) {
      console.log('ajax error:', error)
      if (errFn) {
        errFn(error)
      }
    }
  })
}
