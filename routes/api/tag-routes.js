const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price', 'stock']
        },
      ],
    });
    res.json(tagData);
  } 
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price', 'stock']
        },
      ],
    });
    if(!tagData) {
      res.status(404).json({message: 'No tag with this id!'});
      return;
     }
    res.json(tagData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    return res.json(tagData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
   }
});

router.put('/:id', (req, res) => {
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if(!tagData) {
      res.status(404).json({message: 'No tag with this id!'});
      return;
    }
    return res.json(tagData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!tagData) {
      res.status(404).json({message: 'No tag with this id!'});
      return;
    }
    return res.json(tagData);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
