import * as expect from 'expect';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import getUsers from '../src';

interface RequestBody {
  userId: string;
}

const testUserResponse = {
  id: 'test1',
  name: 'Jim'
};

describe("gets users", () => {
  let calledUserIds = [];
  const server = setupServer(
    rest.post<RequestBody>('https://testing-things.com/user', (req, res, ctx) => {
      calledUserIds.push(req.body.userId);
      return res(ctx.json(testUserResponse))
    }),
  )
  const userIds = ['test1', 'test2', 'test3'];

  // Enable API mocking before tests.
  before(() => server.listen())

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => {
    server.resetHandlers();
    calledUserIds = [];
  })

  // Disable API mocking after the tests are done.
  after(() => server.close())

  it("calls with msw and asserts request and response", async () => {
    const result = await getUsers(userIds);

    expect(userIds).toEqual(calledUserIds);
    expect(result).toEqual([testUserResponse, testUserResponse, testUserResponse]);
  });

  it("calls with msw and asserts request and response (testing another for test cleaning after tests)", async () => {
    const result = await getUsers(userIds);

    expect(userIds).toEqual(calledUserIds);
    expect(result).toEqual([testUserResponse, testUserResponse, testUserResponse]);
  });
});