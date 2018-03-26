module.exports = function(uri){
    var mongoose = require('mongoose');

    mongoose.connect(uri);

    mongoose.connection.on('conconnected', function () {
        console.log("Aplicação contectada ao banco de dados!")
    });

    mongoose.connection.on('error', function (error) {
        console.log("Erro na conecxão com o db: " + error);
    });

    mongoose.connection.on('disconnected', function () {
        console.log("Aplicação descontectada do banco de dados!")
    });
    process.on("SIGINT", function () {
        mongoose.connection.close(function () {
            console.log("Aplicação finzalida, conexão finalizada!")
            process.exit(0);
        });
    });
};
