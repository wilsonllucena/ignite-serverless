import { document } from 'src/utils/dynamodbClient';

export const handle = async (event) => {
  const { user_id } = event.pathParameters;

  const { Items } = await document
    .query({
      TableName: 'todos',
      IndexName: 'userId',
      KeyConditionExpression: 'user_id = :user_id',
      ExpressionAttributeValues: {
        ':user_id': user_id,
      },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      Items,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
