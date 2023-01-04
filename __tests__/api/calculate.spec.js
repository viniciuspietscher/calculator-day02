import { createMocks } from "node-mocks-http";
import handler from "../../pages/api/calculate/[...params]";

describe("test calculate API handler", () => {
  function getMockHttpObjs(method, query) {
    const { req, res } = createMocks({ method, query });
    return { req, res };
  }

  it("returns a valid result and status code when add is successful", () => {
    const { req, res } = getMockHttpObjs("GET", { params: ["add", 1, 1] });
    handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ "content-type": "application/json" });
    expect(res._getJSONData()).toEqual({ result: 2 });
  });

  it("should only accept GET method", () => {
    let req, res;

    ({ req, res } = getMockHttpObjs("POST", { params: ["add", 1, 1] }));
    handler(req, res);
    expect(res.statusCode).toBe(500);

    ({ req, res } = getMockHttpObjs("PUT", { params: ["add", 1, 1] }));
    handler(req, res);
    expect(res.statusCode).toBe(500);

    ({ req, res } = getMockHttpObjs("DELETE", { params: ["add", 1, 1] }));
    handler(req, res);
    expect(res.statusCode).toBe(500);

    ({ req, res } = getMockHttpObjs("WHATEVER", { params: ["add", 1, 1] }));
    handler(req, res);
    expect(res.statusCode).toBe(500);
  });
});

