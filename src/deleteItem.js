import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "http-crud";

export const handler = async (event) => {
  let statusCode = 200;
  let body;
  const headers = { "Content-Type": "application/json" };

  try {
    const { id } = event.pathParameters;
    await dynamo.send(
      new DeleteCommand({
        TableName: tableName,
        Key: { id },
      })
    );
    body = `Deleted item ${id}`;
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
