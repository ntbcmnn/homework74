export interface IMessage {
    message: string;
    datetime: string;
}

export type IMessageMutation = Omit<IMessage, 'datetime'>;