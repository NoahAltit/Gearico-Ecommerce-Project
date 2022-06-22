"use strict";

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

// use this data. Changes will persist until the server (backend) restarts.
// const items = require("./data/items.json");

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
console.log(MONGO_URI);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

//=====Declare 'db'=====
const db = client.db("ecommerce");

const getItems = async (req, res) => {
  let start = req.query.start ? Number(req.query.start) : 0;
  let limit = req.query.limit ? Number(req.query.limit) : 10;

  try {
    await client.connect();

    const items = await db
      .collection("items")
      .find()
      .limit(limit)
      .skip(start)
      .toArray();

    switch (true) {
      case items.length <= 0:
        res.json({ status: 400, message: "not found" });
        break;
      default:
        res.status(200).json({
          status: 200,
          start: start,
          limit: limit,
          data: items,
          message: "Request successful",
        });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: "Server error" });
  }
  client.close();
};

const getItemById = async (req, res) => {
  const id = Number(req.params._id);
  try {
    await client.connect();
    const item = await db.collection("items").findOne({ _id: id });

    res
      .status(200)
      .json({ status: 200, data: item, message: "Request successful" });
  } catch (err) {
    res.status(500).json({ status: 500, data: id, message: "Server error" });
  }
  client.close();
};

const getItemsByCategory = async (req, res) => {
  const cat = req.params.cat;
  let start = req.query.start ? Number(req.query.start) : 0;
  let limit = req.query.limit ? Number(req.query.limit) : 10;

  try {
    await client.connect();

    const items = await db
      .collection("items")
      .find({ category: cat })
      .limit(limit)
      .skip(start)
      .toArray();

    switch (true) {
      case items.length <= 0:
        res.json({ status: 400, message: "not found" });
        break;
      default:
        res.status(200).json({
          status: 200,
          start: start,
          limit: limit,
          data: items,
          message: "Request successful",
        });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: "Server error" });
  }
  client.close();
};

const getItemsByBodyLocation = async (req, res) => {
  const location = req.params.location;
  let start = req.query.start ? Number(req.query.start) : 0;
  let limit = req.query.limit ? Number(req.query.limit) : 10;

  try {
    await client.connect();

    const items = await db
      .collection("items")
      .find({ body_location: location })
      .limit(limit)
      .skip(start)
      .toArray();

    switch (true) {
      case items.length <= 0:
        res.json({ status: 400, message: "not found" });
        break;
      default:
        res.status(200).json({
          status: 200,
          start: start,
          limit: limit,
          data: items,
          message: "Request successful",
        });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: "Server error" });
  }
  client.close();
};

const placeOrder = async (req, res) => {
  try {
    await client.connect();
    const reqInfo = req.body;

    console.log("BODY-----------------------", reqInfo);
    console.log("JUST ORDER INFO", req.body.order);

    // const { firstName, lastName, email, address } = reqInfo;

    const newValues = {
      _id: uuidv4(),
      shipping: reqInfo.shipping,
      billing: reqInfo.billing,
      orderInfo: reqInfo.order,
    };
    // const newValues = {
    //   _id: uuidv4(),
    //   customerInfo: reqInfo.shipping,
    //   //   {
    //   //     firstName: reqInfo.shipping.firstName,
    //   //     lastName: reqInfo.shipping.lastName,
    //   //     email: reqInfo.shipping.email,
    //   //     address: reqInfo.shipping.address,
    //   //     province: reqInfo.shipping.province,
    //   //     postcode: reqInfo.shipping.postcode,
    //   //     country: reqInfo.shipping.country,
    //   //     city: reqInfo.shipping.city,
    //   //   },
    //   orderInfo: reqInfo.order,
    //   creditInfo: reqInfo.billing,
    // };

    //=====Post order inside "orders" collection=====
    const data = await db.collection("orders").insertOne(newValues);

    // const items = await db.collection("items").find().toArray();
    // const orders = await db.collection("orders").find().toArray();

    // let orderInfoList = reqInfo.orderInfo.map((el) => el);

    // let orderId = reqInfo.orderInfo.map((el) => el._id);

    // let itemList = [];
    // items.forEach((item) => {
    //   if (orderId.includes(item._id)) itemList.push(item);
    // });

    const promises = [];

    await reqInfo.order.forEach((el) => {
      promises.push(
        db
          .collection("items")
          .updateOne({ _id: el._id }, { $inc: { numInStock: -el.qnt } })
      );
    });

    await Promise.all(promises).then((results) => {
      res.status(200).json({
        status: 200,
        data: newValues,
        // itemList,
        message: "Request successful",
      });
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: "Server error" });
  }

  client.close();
};

const getCompanyById = async (req, res) => {
  const id = Number(req.params._id);
  try {
    await client.connect();
    const company = await db.collection("companies").findOne({ _id: id });

    company
      ? res
          .status(200)
          .json({ status: 200, data: company, message: "Request successful" })
      : res
          .status(404)
          .json({ status: 404, data: id, message: "Company not found" });
  } catch (err) {
    res.status(500).json({ status: 500, data: id, message: "Server error" });
  }
  client.close();
};

module.exports = {
  getItems,
  getItemById,
  getItemsByCategory,
  getItemsByBodyLocation,
  placeOrder,
  getCompanyById,
};
