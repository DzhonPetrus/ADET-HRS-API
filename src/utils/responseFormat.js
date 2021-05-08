module.exports = {
    responseSuccess: (data, message) => {
        return {error:false, data, message};
    }, 
    responseError: (err) => {
        return {error:true, data:[], message:[err]};
    }
}