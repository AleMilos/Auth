const Item = require("../models/itemModel");

const getItemRequiredAttributes = () => {
  // This can be a good starting point to make code more scalable..?
  const allDBAttributes = [];
  const dbRequiredAttributes = [];
  Item.schema.eachPath((path) => {
    // _id, createdAt, updatedAt, __v, are created automatically but are not necessary
    if (!["_id", "createdAt", "updatedAt", "__v"].includes(path)) {
      allDBAttributes.push(path); // add the attribute
    }
  });

  // another array which contains only the REQUIRED attributes
  allDBAttributes.forEach((attribute) => {
    if (Item.schema.paths[attribute].isRequired) {
      dbRequiredAttributes.push(attribute);
    }
  });

  return dbRequiredAttributes;
};

module.exports = { getItemRequiredAttributes };
