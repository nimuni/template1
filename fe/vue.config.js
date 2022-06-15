var path = require("path")

module.exports =  { 
  outputDir : path.resolve(__dirname, "../be/public/"), //build 시 결과물 나오는 폴더경로
  devServer:  { 
    proxy:  { // proxyTable 설정. Back-end가 다른 host인 경우 설정해줘야 함.
      '/api':  { 
        target: 'http://localhost:3000/api', 
        changeOrigin: true , 
        pathRewrite: { 
          "^/api" : '' 
        } 
      } 
    } 
  } 
}