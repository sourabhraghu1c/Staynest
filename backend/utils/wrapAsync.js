module.exports=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next); //this is call for argument function to execute it
    };
};