const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
        {
          model: Tag, as: "tag_info",
          attributes: ['tag_name'],
        },
      ],
    });
    res.json(productData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
        {
          model: Tag, as: "tag_info",
          attributes: ['tag_name'],
        },
      ],
    });
    if(!productData) {
      res.status(404).json({message: 'No product with this id!'});
      return;
     }
    res.json(productData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds){
        if (req.body.tagIds.length) {
          const productTagIdArr = req.body.tagIds.map((tag_id) => {
            return {
              product_id: product.id,
              tag_id,
            };
          });
          return ProductTag.bulkCreate(productTagIdArr);
        }
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
    const productData = await Product.update(req.body, {
      where: {
        id: req.params.id,
      }});

      if (!(req.body.tagIds === undefined)) {
        const productTagData = await ProductTag.findAll({ where: { product_id: req.params.id } });
        const productTags = productTagData.map((productTag) => productTag.get({ plain: true}));
        const productTagIds = productTags.map(({ tag_id }) => tag_id);

        const getNewProductTags = () => {
          if (!req.body.tagIds) {
            return null;
          }
          else {
            if (Array.isArray(req.body.tagIds)){
              return req.body.tagIds
              .filter((tag_id) => !productTagIds.includes(tag_id))
              .map((tag_id) => {
                return {
                  product_id: req.params.id,
                  tag_id,
                };
              });
            }
            else if (productTagIds.includes(req.body.tagIds)) {
              return null;
            }
            else {
              return [{product_id: req.params.id, tag_id: req.body.tagIds}];
            }
          }
        }

        const newProductTags = getNewProductTags();
        console.log("newProductTags");
        console.log(newProductTags);

        const getProductTagsToRemove = () => {
          if (req.body.tagIds === null){
            return productTags;
          }
          else {
            return productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          }
        }
        const productTagsToRemove = getProductTagsToRemove();
        console.log("productTagsToRemove");
        console.log(productTagsToRemove);

        if (productTagsToRemove){
          await ProductTag.destroy({ where: { id: productTagsToRemove } });
        }
        if (newProductTags){
          await ProductTag.bulkCreate(newProductTags);
        }
      }

      const updatedProductData = await Product.findByPk(req.params.id, {
        include: [
          {
            model: Category,
            attributes: ['category_name'],
          },
          {
            model: Tag, as: "tag_info",
            attributes: ['tag_name'],
          },
        ]
      })

      const updatedProductInfo = updatedProductData.get({plain: true});
      res.status(200).json(updatedProductInfo);
  }
  catch (err) {
    res.status(400).json(err);
  }
});


// delete one product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    return res.json(productData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
