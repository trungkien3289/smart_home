const path = require('path');

module.exports = {
    home: (req, res, next) => {
        res.sendFile('index.html', {
            root: path.join('./build')
        });
    },
}

