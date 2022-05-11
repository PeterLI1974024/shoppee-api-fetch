const express = require('express')
const fetch = require('node-fetch')
const app = express()
const cors = require('cors')

app.use(cors())
app.get('/',async(req,res)=>{
   const reponse = await fetch('https://shopee.tw/api/v4/search/search_items?by=relevancy&keyword=nintendo%20switch&limit=90&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2',{
        Headers:{
         'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36',
         'referer':' https://shopee.tw/search?keyword=nintendo%20switch'
        }
    }).then(res=>res.json()).then((data)=>res.json(data.items.map(item=>{
        return{
            title : item.item_basic.name,
            price : (item.item_basic.price) / 100000,
            image : 'https://cf.shopee.tw/file/' + item.item_basic.image,
            link : 'https://shopee.tw/product/' + item.item_basic.shopid + '/'+ item.item_basic.itemid

        }
    }))).catch(e=>console.log(e))
   
 


   
})

app.listen(3000,()=>{
    console.log('the server is running on port 3000')
})