import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "http-crud";

export const handler = async (event) => {
  let statusCode = 200;
  let body;
  const headers = { "Content-Type": "application/json" };

  try {
    const result = await dynamo.send(
      new ScanCommand({
        TableName: tableName,
      })
    );
    body = result.Items;
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers,
  };
};
