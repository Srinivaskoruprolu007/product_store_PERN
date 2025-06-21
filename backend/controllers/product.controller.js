export const getAllProducts = async (req, res) => {
  res.status(200).json({
    message: "Get all products -- Not implemented yet",
  });
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `Get product with id : ${id} -- Not implemented yet`,
  });
};

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  res.status(201).json({
    message: `Create product with name: ${name}, price: ${price}, image: ${image} -- Not implemented yet`,
  });
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;
  res.status(200).json({
    message: `Update product with id: ${id}, name: ${name}, price: ${price}, image: ${image} -- Not implemented yet`,
  });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: `Delete product with id: ${id} -- Not implemented yet`,
  });
};
