const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  lintOnSave:false,
  devServer: {
    host:'127.0.0.1',
    port:8080,
    open:true,//vue專案啟動時自動開啟瀏覽器
    proxy:{
      '/api':{//'/api'是代理標識，用於告訴node，url前面是/api的就是使用代理的
        target:"http://127.0.0.1:5000",//目標地址，一般是指後臺伺服器地址
        changeOrigin:true,//是否跨域
        pathRewrite:{//pathRewrite的作用是把實際RequestUrl中的'/api'用""代替
          '^/api':""
        }
      }
    }
  }
})
