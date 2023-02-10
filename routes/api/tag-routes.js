const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // find all tags
    const tags = await Tag.findAll({
      // include its associated Product data
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    const tags = await Tag.findByPk(req.params.id, {
    // include its associated Product data
    include: [{ model: Product, through: ProductTag }],
  });

  if (!tags) {
    res.status(404).json({ message: 'No tag found with that id!' });
    return;
  }
  res.status(200).json(tags);
} catch (err) {
  res.status(500).json(err);
}
});
  


router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tags = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tags = await Tag.update(
      {
      tag_name: req.body.tag_name,
      }, 
      {
    where: {
      id: req.params.id,
      },
    })
    if (!tags) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tags = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    if (!tags) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
