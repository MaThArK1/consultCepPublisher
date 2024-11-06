import mqConnection from "../infra/amqpConnection";

export type INotification = {
  cep: string;
};

export const sendNotification = async (notification: INotification) => {
  await mqConnection.sendToQueue('ceps', notification);

  console.log(`Sent the notification to consumer`);
};