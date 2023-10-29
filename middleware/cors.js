module.exports = (req, res, next) => {
    res.header("Acces-Control-Allow-Origin", "*");
    res.header(
        "Acces-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept, Authorizaation"
        );
        if(req.method === 'OPTIONS'){
            res.header("Acces-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET" );
            return res.status(200).json({});
        }
        next();

}