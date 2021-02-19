let userSchema = require('./../model/user.model');

exports.verifyReferralCode = (req, res, next) => {
    if (req.body.referralCode === "" || req.body.referralCode == undefined) {
        return res.status(400).json({status: 400, message: "Referral code must be present"})
    } else {
        userSchema.findOne({ 'referenceCode': req.body.referralCode }, function (err, referral) {
            if (err) {
                return res.status(500).json({status: 500, message: "Database connetion error"})
            }
            else if (referral !== null) {
                next();
            } else {
                return res.status(404).json({status: 404, message: "Invalid refferal code"})
            }
        });

    };
}

exports.verifyUserToken = (req,res,next)=>{
    if(req.headers.authorization==="" || req.headers.authorization===undefined){
        return res.status(401).json({status: 401, message: "Token not found"})
    }else{
        var token=req.headers.authorization.split(" ")[1]
        userSchema.findOne({'token':token}).select('+token').exec((err,user)=>{
            if (err) {
                 return res.status(500).json({status: 500, message: "Database connetion error"})}
            else if(user!==null){
                user.token=""
                req.body.user=user
                next();
            }else{
                return res.status(401).json({status: 401, message: "Invalid token"})
            }
        })
        
    }
}