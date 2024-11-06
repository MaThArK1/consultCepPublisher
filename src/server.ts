import { app } from "./app";

app.listen({ port:8000 }, (err, address) => {
    if(err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listenting at port ${address}`);
})

export { app };