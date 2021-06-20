import { v4 } from 'uuid';
import { document } from 'src/utils/dynamodbClient';

interface IToDo {
  title: string;
  deadLine: string;
}

export const handle = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadLine } = JSON.parse(event.body) as IToDo;

  await document
    .put({
      TableName: 'todos',
      Item: {
        id: v4(),
        user_id,
        title,
        done: false,
        deadLine,
        created_at: new Date().toISOString(),
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'ToDo created!',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
