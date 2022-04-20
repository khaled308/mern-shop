class MongoError {
    #errorsMessages = {
        email : "email is already there"
    }
    constructor(err){
        this.errorMsg = null
        if(err.code === 11000){
            this.errorMsg = Object.keys(err.keyValue).map(key=>this.#errorsMessages[key]).join(' , ')
        }
        else{
            this.errorMsg = err.message
        }
    }
}
module.exports = MongoError