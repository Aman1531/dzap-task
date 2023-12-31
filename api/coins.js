const axios = require('axios');

// a list of ids of top 100 coins 
// used for finding out invalid currencies while converting
var coinListSource = []
// same for target currency
var coinListDest = []

const coinApi ={
    fetchTopCoins: (req, res) => {
        listcoins="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
            axios.get(listcoins)
                .then( response => {
                    if(coinListSource.length == 0) 
                     coinListSource =   response.data.map(({id}) => id)
                     
                    res.json(response.data)
                })
    },
    fetchCurrencies : (req , res) => {
        axios.get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
              .then( response => {
                if(coinListDest.length == 0)
                  coinListDest = response.data

                  res.json(response.data)
              })
    },
    convert : (req,res) => {

        if(coinListSource.length == 0)
        {
           res.status(401).json({error:"coin list empty , call fetchTopCoins first!!"})
           return;   
        }
        if(coinListDest.length == 0)
        {
           res.status(401).json({error:"currency list empty , call fetchCurrencies first!!"})
           return;   
        }
        if (!coinListSource.includes(req.params.source_currency)){
           res.status(401).json({error:"invalid source currency"})
             return
        }
    
        if (!coinListDest.includes(req.params.target_currency)){
           res.status(401).json({error:"invalid target currency"})
            return
        }
        let curr_params = "vs_currency="+req.params.target_currency+"&ids="+req.params.source_currency
        let url="https://api.coingecko.com/api/v3/coins/markets?"+curr_params+"&order=market_cap_desc&per_page=1&page=1&sparkline=false&locale=en"
        
        axios.get(url)
             .then( response => {
                console.log(response.data)
                res.json({price:response.data[0].current_price*req.params.amount})
             })
    
    }
}
module.exports = {coinListSource , coinListDest , coinApi}