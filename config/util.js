const {to} = require('await-to-js');
const pe = require('parse-error');
const Color = require('colors');
module.exports.to = async (promise) => 
{
    let err, res;
    [err, res] = await to(promise);
    if(err) return [pe(err)];
    return [null, res];
};

module.exports.ReE = function(res, err)
{ 
    // console.log(err);
    if(typeof err == 'object' && typeof err.message != 'undefined')
    {
        err = err.message;
    }

    return res.json({success:false, message: err});
};

module.exports.ReS = function(res, data)
{
    let send_data = {success:true};

    if(typeof data == 'object')
    {
        send_data = Object.assign(data, send_data);//merge the objects
    }

    return res.json(send_data)
};

module.exports.TE = TE = function(err_message, log)
{ 
    // TE stands for Throw Error
    if(log === true)
    {
        console.error(err_message);
    }

    throw new Error(err_message);
};

module.exports.print = p = function(color, message)
{
    console.log(Color[color](JSON.stringify(message)))
}
