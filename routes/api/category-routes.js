const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  try {
  // find all categories
  const categories = await Category.findAll({
    // include its associated Products
    include: [{ model: Product }],
  });
  res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single category
router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const categories = await Category.findByPk(req.params.id, {
    // include its associated Products
    include: [{ model: Product }],
  });

  if (!categories) {
    res.status(404).json({ message: 'No category found with that id!' });
    return;
  }
  res.status(200).json(categories);
} catch (err) {
  res.status(500).json(err);
}
});

// CREATE a new category
router.post('/', async (req, res) => {
  try {
    const categories = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categories = await Category.update(
      {
      category_name: req.body.category_name,
      }, 
      {
    where: {
      id: req.params.id,
      },
    })
    if (!categories) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }

});

// DELETE a category
router.delete('/:id', async (req, res) => {
  try {
  // delete a category by its `id` value
  const categories = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!categories) {
    res.status(404).json({ message: 'No category found with that id!' });
    return;
  }
  res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
}
});

module.exports = router;
