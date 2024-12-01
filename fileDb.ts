import {IMessage, IMessageMutation} from "./types";
import {promises as fs} from 'fs';
import {existsSync} from "node:fs";

const path = './messages';

const fileDb = {
    async init() {
        try {
            if (!existsSync(path)) {
                await fs.mkdir(path);
            }
        } catch (e) {
            console.error(e);
        }
    },

    async getOneMessage(datetime: string) {
        try {
            if (!existsSync(`${path}/${datetime}.txt`)) return null;

            const message: Buffer<ArrayBufferLike> = await fs.readFile(`${path}/${datetime}.txt`);

            return JSON.parse(message.toString());
        } catch (e) {
            console.error(e);
        }
    },

    async getMessages() {
        try {
            const files: string[] = await fs.readdir(path);
            const messages: IMessage[] = [];

            for (const file of files) {
                const content: Buffer<ArrayBufferLike> = await fs.readFile(`${path}/${file}`);
                messages.push(JSON.parse(content.toString()));
            }

            return messages.slice(-5).reverse();
        } catch (e) {
            console.error(e);
            return [];
        }
    },

    async addMessage(message: IMessageMutation) {
        const datetime: string = new Date().toISOString();
        const msg: IMessage = {
            ...message,
            datetime,
        };

        await fs.writeFile(`${path}/${datetime}.txt`, JSON.stringify(msg));
        return msg;
    },
};

export default fileDb;