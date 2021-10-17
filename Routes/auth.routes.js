const {check, validationResult} = require('express-validator')
const {Router} = require('express');
const bcrypt = require('bcryptjs')
const router = Router();
const User = require('../Models/User')

router.post(
    '/register',
    [
        check('email','Не корректный email').isEmail(),
        check('password','Минимальная длина пароля 6 символов').isLength({min: 6}),

    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Не корректные данне при регистрации"
            })
        }

        const {email, password} = req.body;
        const candidate = await User.findOne({email})

        if(candidate){
           return res.status(400).json({message: "Такой пользователь уже существует"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const  user = new User({email, password: hashedPassword});

        await user.save();

        res.status(201).json({message: "Пользователь создан"});

    } catch (e) {
        res.status(500).json({message: "Что то пошло не так, попробуйте снова"})
    }
})

router.post('/login', async (req, res) => {

})

module.exports = router;

