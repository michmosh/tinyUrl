const Url = require('../models/Url.model');
const urlExists = require('url-exists');
const shortId = require('shortid');
const url = require('url');

const UrlHelper = {
    async createNewUrl(long_url){
        // CHECK IF URL ADDRESS IS NOT FAKE 
        let isExist = await this.checkIfUrlExist(long_url);
        let newUrl;
        if(!isExist){
            throw new Error('URL DOES NOT EXIST');
        }else{
            try{
                newUrl = await this.checkAndInsert(long_url);
            }catch(e){
                throw new Error('SAVE FAILED');
            }
        }
        return newUrl;
    },
    checkIfUrlExist(long_url){
        return new Promise((resolve,reject)=>{
            urlExists(long_url , (err, exists)=>{
                err ? reject(err) : resolve(exists)
            });
        })
    },

    async redirect(req,res){
        const short_url = req.params.short_url;
        const urlObject = await Url.findOne({short_url:short_url});
        res.redirect(urlObject.long_url);
    },

    async checkAndInsert(long_url){
        const q = url.parse(long_url,true);
        let short_url = q.pathname.replace('/',''); 
       let existingUrl = await Url.findOne({short_url:short_url});
       if(!existingUrl){
        return Url.findOneAndUpdate({ long_url: long_url},
            {
              long_url: long_url,
              short_url:shortId.generate()
            },
            {
              new: true,
              upsert:true
            }
          );
       }else{
           return {
               id:existingUrl.id,
               long_url:existingUrl.long_url ,
               short_url:existingUrl.short_url ,
               isOriginal:true , 
               created_at : existingUrl.created_at,
               updated_at : existingUrl.updated_at
            };
       }
        
    }
}



module.exports = {
    UrlHelper
};