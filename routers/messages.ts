import express from 'express';
import fileDb from "../fileDb";
import {IMessage, IMessageMutation} from "../types";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
    const messages: IMessage[] = await fileDb.getMessages();
    res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
    const message: IMessageMutation = {
        message: req.body.message,
    };
    const savedMessage: IMessage = await fileDb.addMessage(message);
    res.send(savedMessage);
});

messagesRouter.get('/:datetime', async (req, res) => {
    const datetime: string = req.params.datetime;
    const message: IMessage = await fileDb.getOneMessage(datetime);

    if (!message) {
        res.send('Message not found');
        return;
    }

    res.send(message);
});

export default messagesRouter;