import Ajax from '../libs/Ajax'

const apiUrl = 'https://www.thatyou.cn/wp-json/wp/v2/posts'
const appUrl = 'https://www.thatyou.cn/h5'

export default {
  appName: 'swiper h5',
  apiUrl: apiUrl,
  appUrl: appUrl,
  cdnUrl: '',
  wxInfo: {},
  wxShareInfo: {
    title: '分享标题',
    desc: '分享描述',
    link: appUrl,
    imgUrl: appUrl + '/img/wxshare.jpg',
  },
  wxShare: function (wxShareInfo, readyCallback, shareOkCallback, shareFailCallback) {
    const shareInfo = wxShareInfo || this.wxShareInfo
    Ajax('https://qixiadmin.tigonetwork.com/game_api/wx_share', 'POST', {
      type: 1,
      callback: encodeURIComponent(window.location.href)
    }, (res) => {
      window.wx.config({
        debug: false,
        appId: res.data.app_id,
        timestamp: res.data.timestamp,
        nonceStr: res.data.nonce_str,
        signature: res.data.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
      })
    }, (error) => {
      console.log('调用获取微信分享信息出错：', error)
    })

    window.wx.ready(function () {
      if (readyCallback) {
        readyCallback()
      }
      window.wx.onMenuShareTimeline({
        title: shareInfo.title,
        link: shareInfo.link,
        imgUrl: shareInfo.imgUrl,
        success: function () {
          console.log('分享成功')
          if (shareOkCallback) shareOkCallback()
        },
        cancel: function () {
          console.log('分享失败')
          if (shareFailCallback) shareFailCallback()
        }
      })
  
      window.wx.onMenuShareAppMessage({
        desc: shareInfo.desc,
        title: shareInfo.title,
        link: shareInfo.link,
        imgUrl: shareInfo.imgUrl,
        type: 'link',
        dataUrl: '',
        success: function () {
          console.log('分享成功')
          if (shareOkCallback) shareOkCallback()
        },
        cancel: function () {
          console.log('分享失败')
          if (shareFailCallback) shareFailCallback()
        }
      })
    })
  },
  extends: {}
}
