
import app from '../../app';

describe('DocHut', () => {
  decribe('GET /api/user - get all users', () => {
    let expectedProps = ['id', 'firstName', 'lastName', 'userName', 'email', 'password'];
    return request(app).get('/api/user')
      .expect(200)
      .then(res => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('should return objects with correct props', () => {
    return request(app).get('/api/users')
      .expect(200)
      .then(res => {
        let sampleKeys = Object.keys(res.body[0]);
        expectedProps.forEach((key) => {
          expect(sampleKeys.includes(key)).toBe(true);
        });
      });
  });
});