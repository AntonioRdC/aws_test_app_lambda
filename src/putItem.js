import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "http-crud";

export const handler = async (event) => {
  let statusCode = 200;
  let body;
  const headers = { "Content-Type": "application/json" };

  try {
    const requestJSON = JSON.parse(event.body);
    const { id, price, name } = requestJSON;

    await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: { id, price, name },
      })
    );

    body = `Put item ${id}`;
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
