module.exports = function(uri){
    var mongoose = require('mongoose');

    mongoose.connect(uri);

    mongoose.connection.on('conconnected', function () {
        console.log("Aplica��o contectada ao banco de dados!")
    });

    mongoose.connection.on('error', function (error) {
        console.log("Erro na conecx�o com o db: " + error);
    });

    mongoose.connection.on('disconnected', function () {
        console.log("Aplica��o descontectada do banco de dados!")
    });
    process.on("SIGINT", function () {
        mongoose.connection.close(function () {
            console.log("Aplica��o finzalida, conex�o finalizada!")
            process.exit(0);
        });
    });
};
