const { router } = require("../../app");

router.get('/data', (req, res, next) => {
    res.status(200).json({
        message: 'All data got'
    })
})