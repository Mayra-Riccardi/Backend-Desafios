const logger = ((req, res, next) => {//crear una carpeta especifica para esto
    const method = req.method;
    const url = req.url;
    const year = new Date().getFullYear()
    console.log(`[${method}] => ${url}`, year)
    next();
  })

  module.exports = logger