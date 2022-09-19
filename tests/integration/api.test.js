const request = require('supertest')
const Cloth = require('../../models/cloth')
const User = require('../../models/user')

let server

describe('/',()=>{
    beforeEach(()=>{server=require('../../index')})
    afterEach(async()=>{
        server.close()
        await Cloth.deleteMany({})
        await User.deleteMany({})
    })
    describe('GET /',()=>{
        it('should return all cloth',async()=>{
            await Cloth.collection.insertMany([
                {
                    id:1,
                    name:"Dennis Lingo",
                    imageUrl:"images\download.jpg",
                    price:700,
                    description:"Men Pink Slim Fit Casual Shirt",
                    type:"shirt"
                }
            ])
            const res = await request(server).get('/cloth')
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(1)
            expect(res.body.some(g=>g.name === 'Dennis Lingo')).toBeTruthy()
        })
    })
    describe('GET /:id',()=>{
        it('should return the cloth with specific id',async()=>{
            const cloth = new Cloth({
                    id:1,
                    name:"Dennis Lingo",
                    imageUrl:"images\download.jpg",
                    price:700,
                    description:"Men Pink Slim Fit Casual Shirt",
                    type:"shirt"
                })
            await cloth.save()
            const res = await request(server).get('/cloth/'+cloth.id)
            expect(res.status).toBe(200)
            expect(res.body[0]).toHaveProperty('name',cloth.name)
        })
        it('should return status 404 for invalid id',async()=>{
            const res = await request(server).get('/cloth/1')
            expect(res.status).toBe(404)
        })
    })
    describe('POST /',()=>{
        it('should return status 200 if new user is registered',async()=>{
            const res = await request(server)
                .post('/user/add')
                .send({
                    name:"sathwik",
                    email:"sathwik@gmail.com",
                    phone:"0123456789",
                    password:"sathwik@1"
                })
            expect(res.status).toBe(200)
            })
        })
})