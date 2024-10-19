import userModel from "../models/userModel.js"


// add products to user cart
const addToCart = async (req, res) => {

  try {
    const { userId, itemId, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId] += quantity;
    } else {
      cartData[itemId] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.status(200).json({ success: true, message: "Item added to cart" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }

}

// update user cart
const updateCart = async (req, res) => {

  try {
    const { userId, itemId, quantity } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (quantity > 0) {
      cartData[itemId] = quantity;
    } else {
      delete cartData[itemId];
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.status(200).json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}


// get user cart data
const getUserCart = async (req, res) => {

  try {
    const { userId } = req.body

    const userData = await userModel.findById(userId)
    let cartData = await userData.cartData

    return res.status(200).json({ success: true, cartData })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: false, message: error.message })
  }

}

export { addToCart, updateCart, getUserCart }

