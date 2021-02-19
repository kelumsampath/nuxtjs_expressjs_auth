
var userSchema = require('./model/user.model')
module.exports.userData = () => {
    var admin = {
        firstName: 'kelum',
        lastName: 'sampath',
        email: 'kelumsmt@gmail.com',
        phoneNumber: '0775227114',
        password: '1234',
        referralCode: '91gKZrFOiAgdcmnMjNsg3gYvxVTxh4qPJPXuIx4BBqdNFn16LZzZDOW5EJkymnXS',
        isAdmin:true
    }
    userSchema.create(admin, (error, data) => {
        if (error) {
            console.log("User already available")
        } else {
            console.log("Admin user data sedded")
        }
    })
}
