const {Router} = require('express')
const Link = require('../Models/Link')
const router = Router();

router.get('/:code', async (req, res) =>{

    try {

        const newLink = req.params.code.substr(1)

        const link = await Link.deleteOne({code: newLink})

        if(link.deletedCount === 1 ){
            return res.status(200).json(true)

        } res.status(404).json('Ссылка не найдена')

    } catch (e) {
        res.status(500).json({message: "Что то пошло не так, попробуйте снова"})
    }
})

module.exports = router



