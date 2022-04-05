const { baseUrl } = require("../config");
const { sign } = require("jsonwebtoken");
const { jwtSecret, snapUrl, snapServerKey } = require("../config");
const axios = require("axios").default;

const paginationObj = (
  length,
  limit = 10,
  currentPage = 1,
  queryOption = {}
) => {
  let prev = "null",
    next = "null";
  const totalPage = Math.ceil(length / limit);

  if (parseInt(currentPage) > 1) {
    prev = `${baseUrl}/products?page=${parseInt(currentPage) - 1}`;

    for (let query in queryOption) {
      if (queryOption[query] != null) {
        prev += `&${query}=${queryOption[query]}`;
      }
    }
  }

  if (parseInt(currentPage) < totalPage) {
    next = `${baseUrl}/products?page=${parseInt(currentPage) + 1}`;
    for (let query in queryOption) {
      if (queryOption[query] != null) {
        next += `&${query}=${queryOption[query]}`;
      }
    }
  }

  return {
    total_page: totalPage,
    prev,
    next,
  };
};

const getJwtToken = (payload) => {
  const token = sign(payload, jwtSecret);
  return token;
};

const snapBodyBuilder = (
  carts,
  user,
  transaction,
  total,
  shipment_service,
  shipment_cost
) => {
  const item_details = carts.map((cart, index) => {
    return {
      id: cart.product.id,
      price: cart.product.price,
      quantity: cart.quantity,
      name: cart.product.name,
    };
  });

  item_details.push({
    id: "shipments-01",
    price: shipment_cost,
    quantity: 1,
    name: `Shipment with ${shipment_service.toUpperCase()}`,
  });

  const customer_details = {
    first_name: user.name,
    email: user.email,
    phone: user.phone_number,
  };

  return {
    transaction_details: {
      order_id: transaction.id,
      gross_amount: total,
    },
    item_details,
    customer_details,
  };
};

const getSnapUrl = async (
  carts,
  user,
  transaction,
  total,
  shipment_service,
  shipment_cost
) => {
  const auth = Buffer.from(snapServerKey + ":").toString("base64");
  const bodyData = snapBodyBuilder(
    carts,
    user,
    transaction,
    total,
    shipment_service,
    shipment_cost
  );
  console.log(auth);
  const { data } = await axios.post(snapUrl, bodyData, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  return {
    url: data.redirect_url,
    bodyData,
  };
};

module.exports = { paginationObj, getJwtToken, getSnapUrl };
