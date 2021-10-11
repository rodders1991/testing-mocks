import * as nock from 'nock';
import * as expect from 'expect';
import getUsers, { THIRD_PARTY_API_URL } from '../src';

describe("gets users", () => {
  const userIds = ['test1', 'test2', 'test3'];

  afterEach(() => {
    nock.cleanAll()
    nock.enableNetConnect();
  });
  it("calls with nock and asserts request and response", async () => {
    const testUserResponse = {
      id: 'test1',
      name: 'Jim'
    };

    userIds.map(userId => {
      nock(THIRD_PARTY_API_URL)
      .persist()
      .post('', {
        userId
      })
      .reply(200, (_, requestBody) => {
        expect(requestBody).toEqual({ userId });
        return testUserResponse;
      });
    })

    const result = await getUsers(userIds);

    expect(result).toEqual([testUserResponse, testUserResponse, testUserResponse]);
  });

  it("calls with nock and asserts request and response (testing another for test cleaning after tests)", async () => {
    const testUserResponse = {
      id: 'test1',
      name: 'Jim'
    };

    userIds.map(userId => {
      nock(THIRD_PARTY_API_URL)
      .persist()
      .post('', {
        userId
      })
      .reply(200, (_, requestBody) => {
        expect(requestBody).toEqual({ userId });
        return testUserResponse;
      });
    })

    const result = await getUsers(userIds);

    expect(result).toEqual([testUserResponse, testUserResponse, testUserResponse]);
  });
});