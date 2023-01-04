import { add, subtract, multiply, divide } from "../../../utils/calculate";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      throw new Error(
        `Unsupported method ${req.method}. Only GET method is supported`
      );
    }

    if (!Array.isArray(req.query.params)) {
      throw new Error(`Expected multiple params. got: ${req.query.params}`);
    }

    const params = extractParams(req.query.params);
    let result: number;
    switch (params.operation) {
      case "add":
        result = add(params.first, params.second);
        break;
      case "subtract":
        result = subtract(params.first, params.second);
        break;
      case "multiply":
        result = multiply(params.first, params.second);
        break;
      case "divide":
        result = divide(params.first, params.second);
        break;
      default:
        throw new Error(`Unsupported operation ${params.operation}`);
    }
    res.status(200).json({ result });
  } catch (e: any) {
    let errMsg = "Unknown Error";
    if (e instanceof Error) {
      errMsg = e.message;
    }
    res.status(500).json({ message: errMsg });
  }
}

interface QueryParams {
  operation: string;
  first: number;
  second: number;
}

function extractParams(queryParams: string[]): QueryParams {
  if (queryParams.length !== 3) {
    throw new Error(
      `Query params should have 3 items. Received ${queryParams.length}: ${queryParams}`
    );
  }

  try {
    const params = {
      operation: queryParams[0],
      first: parseInt(queryParams[1]),
      second: parseInt(queryParams[2]),
    };

    if (isNaN(params.first) || isNaN(params.second)) {
      throw new Error(
        `Params "first" and "second" must be numbers. Received: ${queryParams}`
      );
    }

    return params;
  } catch (e: any) {
    let errMsg = `Failed to process query params. Received: ${queryParams}`;
    if (e instanceof Error) {
      errMsg = e.message;
    }
    throw new Error(errMsg);
  }
}

