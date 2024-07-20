const catchNotFoundError = (req,res)=>{
    res.send({
        statusCode: 404,
        message: "Page NotFound"
    })
}


const catchAllErrors = (err,req,res,next)=>{
    const status = err?.status ?? err?.statusCode ?? 500
   return res.json({
        statusCode: status,
        message: err.message ?? "Internal server error"
    })
}

module.exports = {
    catchNotFoundError,
    catchAllErrors
}