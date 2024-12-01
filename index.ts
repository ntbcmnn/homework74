import express from 'express';
import messagesRouter from "./routers/messages";
import fileDb from "./fileDb";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/messages', messagesRouter);

const run: () => Promise<void> = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Listening on port http://localhost:${port}`);
    });
};

run().catch((err) => {
    console.error(err)
});