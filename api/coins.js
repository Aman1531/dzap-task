const axios = require('axios');

// a list of ids of top 100 coins 
// used for finding out invalid currencies while converting
var coinListSource = []
// same for target currency
var coinListDest = []

const apikey = 'x_cg_demo_api_key=CG-HVxG31BDG943mEUevP3BXZtx';
const url = "https://api.coingecko.com/api/v3/";

const coinApi ={
    fetchTopCoins: (req, res) => {
        listcoins=url+"coins/markets?"+apikey+"&vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
            axios.get(listcoins)
                .then( response => {
                    if(coinListSource.length == 0) 
                     coinListSource =   response.data.map(({id}) => id)
                     
                    res.json(response.data.map(({id,name}) => ({value:id , label:name})))
                })
    },
    fetchCurrencies : (req , res) => {
        axios.get(url+"simple/supported_vs_currencies?"+apikey)
              .then( response => {
                if(coinListDest.length == 0)
                  coinListDest = response.data

                  res.json(response.data.map((id) => ({value:id , label:id})))
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
        let curr_params = "&vs_currency="+req.params.target_currency+"&ids="+req.params.source_currency
        let fetchUrl = url+"coins/markets?"+apikey+curr_params+"&order=market_cap_desc&per_page=1&page=1&sparkline=false&locale=en"
        
        axios.get(fetchUrl)
             .then( response => {
                console.log(response.data)
                res.json({price:response.data[0].current_price*req.params.amount})
             })
    
    }
}
module.exports = {coinListSource , coinListDest , coinApi}