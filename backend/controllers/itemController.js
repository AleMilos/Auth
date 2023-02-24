const { asyncHandler } = require("../utils/generalUtils");
const { getItemRequiredAttributes } = require("../utils/itemUtils");
const Item = require("../models/itemModel");

const loadItem = asyncHandler(async (req, res) => {
  //check if user is a View user --> in case reject
  if (res.req.user.role === "View") {
    res.status(401);
    throw new Error("Not Authorized: LoadItem1");
  }

  // Get the DataBase required attributes for the ITEM(e.g. name, code...)
  const itemRequiredAttributes = getItemRequiredAttributes();
  // Preparing for a Mapping {attribute_i: value_i}
  const mapAttribute_Value = {};

  // Map through the itemRequiredAttributes array to get req.body[attribute] for each attribute
  itemRequiredAttributes.map((attribute) => {
    // check IF there is the attribute in the request ...
    if (!req.body[attribute]) {
      const defaultValue = Item.schema.paths[attribute].defaultValue;
      if (!defaultValue) {
        // ... check if there is not a default value for that attribute ...
        // ...YES... the request is missing some attribute --> throw error 400 (user error) ...
        res.status(400);
        throw new Error(
          `Please Include All Fields, ${attribute} is missing LoadItem1`
        );
      } else {
        // ...NO ... there is a default Value for the missing attribute in the request
        mapAttribute_Value[attribute] = defaultValue;
      }
    }
    // the attribute is in the request as expected
    mapAttribute_Value[attribute] = req.body[attribute];
  });

  // Item.create() returns a promise
  try {
    // Create the object with all the request passed attributes and the default values
    const item = await Item.create(mapAttribute_Value);
    res.status(201).json(item);
  } catch (err) {
    res.status(400);
    // Item with the same code already exists
    throw new Error("Item already exists: LoadItem1");
  }
});

const editItem = asyncHandler(async (req, res) => {
  // this requires that some attributes cannot be removed (e.g. quantity cannot be removed)
  if (res.req.user.role === "View" || res.req.user.role === "Normal") {
    res.status(401);
    throw new Error("Not Authorized: EditItem1");
  }

  let item = await Item.findOne({ code });

  if (!item) {
    res.status(400);
    throw new Error("Item Not Found: EditItem1");
  }

  if (!item.isEditable) {
    res.status(403);
    throw new Error("Someone is already editing this item: EditItem1");
  }

  item = await Item.findOneAndUpdate({ code }, { isEditable: false });

  const { code, attributeName, newValue } = req.body;
});

const setEditableItem = asyncHandler(async (req, res) => {
  //A) L'idea è che quando l'utente inizia a voler editare, chiama setEditable che vieta l'accesso a altri user
  //B) Quando ha deciso cosa cambiare manda i nuovi attributi e fa l'update
  //C) E poi c'è un'altra funzione che fa resetEditable

  // Non posso integrare nulla perché esistono UNDO operations che resettano isEditable e basta
  // Quando finisco di editare, resetto isEditable dalla funzione editItem.
  // Quando voglio editare chiamo setEditable, che manderà risposta YES (posso editare), NO (non posso)

  if (res.req.user.role === "View" || res.req.user.role === "Normal") {
    res.status(401);
    throw new Error("Not Authorized: SetEditableItem");
  }
});

const resetEditableItem = asyncHandler(async (req, res) => {
  if (res.req.user.role === "View" || res.req.user.role === "Normal") {
    res.status(401);
    throw new Error("Not Authorized: ResetEditable1");
  }

  const { code } = req.body;

  if (!code) {
    res.status(400);
    throw new Error("Missing Fields: ResetEditable1");
  }

  let item = await Item.findOne({ code });

  if (!item) {
    res.status(400);
    throw new Error("Item Not Found: ResetEditable1");
  }

  if (!item.isEditable) {
    item = await Item.findOneAndUpdate({ code }, { isEditable: true });

    if (!item) {
      res.status(400);
      throw new Error("Item Not Found: ResetEditable1");
    }
  }
  res.status(200).json({ message: "Reresetted Editable" });
});

const deleteItem = asyncHandler(async (req, res) => {
  if (res.req.user.role === "View" || res.req.user.role === "Normal") {
    res.status(401);
    throw new Error("Not Authorized: DeleteItem1");
  }

  const { code } = req.body;

  if (!code) {
    res.status(400);
    throw new Error("Missing Fields: DeleteItem1");
  }

  let item = await Item.findOne({ code });

  if (!item) {
    res.status(400);
    throw new Error("Item Not Found: DeleteItem1");
  }

  if (!item.isEditable) {
    res.status(403);
    throw new Error("Someone is editing this item: DeleteItem1");
  } else {
    // set Item.isEditable = false --> nobody else can edit or delete this item
    item = await Item.findOneAndUpdate({ code }, { isEditable: false });
    if (!item) {
      res.status(400);
      throw new Error("Item Not Found: DeleteItem2");
    }
  }

  const deletedItem = await Item.findOneAndDelete({ code });
  if (!deletedItem) {
    res.status(400);
    throw new Error("Something went wrong: DeleteItem1");
  } else {
    res.status(200).json({ message: "Item Deleted", deletedItem });
  }
});

module.exports = { loadItem, deleteItem, resetEditableItem };
