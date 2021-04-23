const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price', 'stock']
        },
      ],
    });
    res.json(categoryData);
  } 
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
 try {
   const categoryData = await Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock']
      },
    ],
   });
   if(!categoryData) {
    res.status(404).json({message: 'No category with this id!'});
    return;
   }
   res.json(categoryData);
 }
 catch (err) {
  console.log(err);
  res.status(500).json(err);
 }
});

router.post('/', (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    return res.json(categoryData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
   }
});

router.put('/:id', (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if(!categoryData) {
      res.status(404).json({message: 'No category with this id!'});
      return;
     }
    return res.json(categoryData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!categoryData) {
      res.status(404).json({message: 'No category with this id!'});
      return;
    }
    return res.json(categoryData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
