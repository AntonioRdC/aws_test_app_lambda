import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "http-crud";

export const handler = async (event) => {
  let statusCode = 200;
  let body;
  const headers = { "Content-Type": "application/json" };

  try {
    const { id } = event.pathParameters;
    const result = await dynamo.send(
      new GetCommand({
        TableName: tableName,
        Key: { id },
      })
    );
    body = result.Item;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
