const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');  // Убедитесь, что bcrypt подключен правильно
const conn = require('../dbConnection').promise();

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        // Проверка на существование email в базе данных
        const [row] = await conn.execute(
            "SELECT `email` FROM `users` WHERE `email`=?",
            [req.body.email]
        );

        if (row.length > 0) {
            return res.status(201).json({
                message: "The E-mail already in use",
            });
        }

        // Хэширование пароля с использованием bcryptjs
        const hashPass = await bcrypt.hash(req.body.password, 12); // Добавлен 'await'

        // Вставка нового пользователя в базу данных
        const [rows] = await conn.execute('INSERT INTO `users` (`name`, `email`, `password`) VALUES (?, ?, ?)', [
            req.body.name,
            req.body.email,
            hashPass
        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                message: "The user has been successfully inserted.",
            });
        }
    } catch (err) {
        next(err);  // Перехватывание ошибок
    }
};
