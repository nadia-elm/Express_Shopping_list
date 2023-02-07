
process.env.NODE_ENV = "test";


const request = require("supertest")
const app = require("./app")
let items = require("./fakeDb")

let popsicle = {name: "popsicle", price: 1.45}
let cheerios = {name:"cheerios", price: 3.40}

beforeEach(function(){
    items.push(popsicle)
})


afterEach(function(){
    items.length = 0;
})

describe("GET/items", () =>{
    test ("Get all items ",async () =>{
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items :[popsicle]})

    })
})

describe("POST/items",() =>{
    test("Creating a new item", async ()=>{
        const res = await request(app).post("/items").send ({name :"cheerios",price:3.40})
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({item:{name :"cheerios",price:3.40}})

    })
})

describe("PATCH/items/:name", ()=>{
    test("updating an item name" ,async () =>{
        const res = await request(app).patch("/items/popsicle").send({name:"candy", price:2})
        expect(res.body).toEqual({ updated: { name: "candy", price: 2 } });
    })
})

describe("Delete/items/:name", () =>{
    test("deleting an item", async()=>{
        const res = await request(app).delete(`/items/${popsicle.name}`)
        expect(res.body).toEqual({message : "Deleted"})
    })
})


