import request from 'supertest';

import app from '../app';
import User from '../models/player';

const clearDatabase = async () => {
    try {
        await User.deleteMany({
            email: {
                $in: [
                    'user@test.com',
                    'newuser@test.com',
                    'user@othertest.com'
                ]
            }
        });
    } catch (err) {
        console.log("error in clearing database:", err);
    }
}

describe('Testing User-Signup', () => {
    // deleting all the test users
    afterAll(() => clearDatabase());

    test('Empty Name', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                name: "",
                email: "randomstring",
                password: "dsdasdasd"
            })
            .set('Accept', 'application/json');

        expect(res.body).toEqual("Name cannot be empty!");
        expect(res.status).toEqual(400);
    });

    test('Empty Email', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                name: "name",
                email: "",
                password: "sdfsdfa"
            })
            .set('Accept', 'application/json');

        expect(res.body).toEqual("Email cannot be empty!");
        expect(res.status).toEqual(400);
    });

    test('Empty Password', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                name: "name",
                email: "new@email.com",
                password: ""
            })
            .set('Accept', 'application/json');

        expect(res.body).toEqual("Password cannot be empty!");
        expect(res.status).toEqual(400);
    });

    test('Incorrect email', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                name: "name",
                email: "random string",
                password: "password"
            })
            .set('Accept', 'application/json');

        expect(res.body).toEqual("Provide Valid email");
        expect(res.status).toEqual(400);
    });

    test('Existing User', async () => {
        // create a test user
        await request(app)
            .post('/signup')
            .send({
                name: "test user",
                email: "user@test.com",
                password: "Password@123"
            })
            .set('Accept', 'application/json');

        const res = await request(app)
            .post('/signup')
            .send({
                name: "name",
                email: "user@test.com",
                password: "Password@123"
            })
            .set('Accept', 'application/json');

        expect(res.body).toEqual("User Already Exist!");
        expect(res.status).toEqual(400);
    }, 10000);

    test('Successful Signup', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                name: "name",
                email: "newuser@test.com",
                password: "Password@123"
            })
            .set('Accept', 'application/json');

        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("data");
    });

    test('Incorrect password', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                name: "name",
                email: "new@email.com",
                password: "random string"
            })
            .set('Accept', 'application/json');

        expect(res.body).toEqual("Password not meet the requirements!");
        expect(res.status).toEqual(400);
    });

});

describe('Testing User-Login', () => {
    afterAll(() => clearDatabase());
    test('Empty Email', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: "",
                password: "sdfsdfa"
            })
            .set('Accept', 'application/json');

        expect(res.body).toEqual("Email cannot be empty!");
        expect(res.status).toEqual(400);
    });
    test('Empty Password', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: "new@email.com",
                password: ""
            })
            .set('Accept', 'application/json');

        expect(res.body).toEqual("Password cannot be empty!");
        expect(res.status).toEqual(400);
    });
    test('Incorrect email', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: "someone@email.com",
                password: "Password@123"
            })
            .set('Accept', 'application/json');

        expect(res.body).toEqual("User does not exist!");
        expect(res.status).toEqual(400);
    });

    test('Incorrect password', async () => {
        // create the user
        await request(app)
            .post('/signup')
            .send({
                name: "test user",
                email: "user@othertest.com",
                password: "Password@123"
            })
            .set('Accept', 'application/json');

        const res = await request(app)
            .post('/login')
            .send({
                email: "user@othertest.com",
                password: "random string"
            })
            .set('Accept', 'application/json');

        expect(res.body).toEqual("Invalid Credentials!");
        expect(res.status).toEqual(401);
    });

    test('valid credentials', async () => {

        const res = await request(app)
            .post('/login')
            .send({
                email: "user@othertest.com",
                password: "Password@123"
            })
            .set('Accept', 'application/json');

        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("user_name");
    });
});