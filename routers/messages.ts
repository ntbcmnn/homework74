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

export default messagesRouter;