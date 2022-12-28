const request = require("supertest");
const { expect } = require("@jest/globals");

describe("GraphQL API", () => {
  // unit test get brands
  it("should get brand name", async () => {
    const res = await request("http://localhost:8080/graphql")
      .post("/")
      .send({
        query: `{brands {Brand_name}}`,
        query: `{brands {id}}`,
      })
      .expect(200);

    expect(res.body.data.brands).toBeDefined();
  });
});

describe("GraphQL API", () => {
  // unit test get brands
  it("should get status as an enum type", async () => {
    const res = await request("http://localhost:8080/graphql")
      .post("/")
      .send({
        query: `{brands {Status}}`,
      })
      .expect(200);

    expect(typeof res.body.data.brands[0].Status).toBe("string");
  });
});

// add a new brand
describe("GraphQL API", () => {
  it("should add a new brand", async () => {
    const res = await request("http://localhost:8080/graphql")
      .post("/")
      .send({
        query: `mutation {addBrand(Brand_name: "test", Status: new , Logo: "logo", IPR: "IPR" , Designation: "TEST" , Status_date: "2022-01-01" , Number: "1111" , Office: "Japan" , Nice_classification: "12" , Owner : "NISSAN") {Brand_name Status Logo IPR Designation Status_date Number Office Nice_classification Owner}}`,
      })
      .expect(200);

    expect(res.body.data.addBrand.Brand_name).toBe("test");
    expect(res.body.data.addBrand.Status).toBe("Registered");
    expect(res.body.data.addBrand.Logo).toBe("logo");
    expect(res.body.data.addBrand.IPR).toBe("IPR");
    expect(res.body.data.addBrand.Designation).toBe("TEST");
    expect(res.body.data.addBrand.Status_date).toBe("2022-01-01");
    expect(res.body.data.addBrand.Number).toBe("1111");
    expect(res.body.data.addBrand.Office).toBe("Japan");
    expect(res.body.data.addBrand.Nice_classification).toBe("12");
    expect(res.body.data.addBrand.Owner).toBe("NISSAN");
  });
});

// update a brand 
describe("GraphQL API", () => {
  it("should update a brand", async () => {
    const res = await request("http://localhost:8080/graphql")
      .post("/")
      .send({
        query: `mutation {updateBrand(id: "63a46982af00191625b8f294", Brand_name: "update", Status: completed , Logo: "logo", IPR: "IPR" , Designation: "TEST" , Status_date: "2022-01-01" , Number: "1111" , Office: "Japan" , Nice_classification: "12" , Owner : "NISSAN") {Brand_name Status Logo IPR Designation Status_date Number Office Nice_classification Owner}}`,
      })
      .expect(200);

    expect(res.body.data.updateBrand.Brand_name).toBe("update");
    expect(res.body.data.updateBrand.Status).toBe("Expired");
    expect(res.body.data.updateBrand.Logo).toBe("logo");
    expect(res.body.data.updateBrand.IPR).toBe("IPR");
    expect(res.body.data.updateBrand.Designation).toBe("TEST");
    expect(res.body.data.updateBrand.Status_date).toBe("2022-01-01");
    expect(res.body.data.updateBrand.Number).toBe("1111");
    expect(res.body.data.updateBrand.Office).toBe("Japan");
    expect(res.body.data.updateBrand.Nice_classification).toBe("12");
    expect(res.body.data.updateBrand.Owner).toBe("NISSAN");
  });
});

// delete a brand
describe("GraphQL API", () => {
  it("should delete a brand", async () => {
    const res = await request("http://localhost:8080/graphql")
      .post("/")
      .send({
        query: `mutation {deleteBrand(id: "63aaed0d481772b5729cd568") {Brand_name}}`,
      })
      .expect(200);

    expect(res.body.data.deleteBrand).toBe(null);
  });
});