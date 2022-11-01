
const Server=require('./src/server')

const server=new Server().app;

const port=process.env.port || 8080

server.listen(port,()=>{
    console.log( `server running on ${port} port`)
})