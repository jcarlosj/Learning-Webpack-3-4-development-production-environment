const path = require( 'path' );     /* Paquete nativo en Webpack */

module .exports = {
    entry: {
        invie: path .resolve( __dirname, 'src/index.js' )
    },
    output: {
        path: path .resolve( __dirname, 'dist' ),   /* Path de archivos de salida */
        filename: 'js/[name].js'                    /* Directorio de destino y nombre dinámico de archivos */
    },
    devServer: {
        port: 9000                                  /* Por defecto el puerto es 8080 */
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,                                /* Soporte para extenciones .js y jsx (ReactJS) */
                exclude: /(node_modules)/,                          /* Directorios excluidos de transpilación */
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'es2015', 'react', 'stage-2' ]   /* Habilita: ES6, React, Spread Operator usando Babel */
                    }
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]        /* El primero pinta los estilos, el segundo los interpreta (Se ejecutan de derecha a izquierda) */
            },
            {
                test: /\.(jpg|png|gif|svg)$/,                       /* Soporte para extenciones para imagenes */
                loader: 'url-loader',
                options: {
                    limit: 1000000,                     /* Tamaño máximo */
                    fallBack: 'file-loader',            /* Por defecto usa 'publicPath' */
                    name: 'images/[name].[hash].[ext]'  /* Directorio de destino y nombre dinámico, hash dinámico y extensión dinámica de archivos */
                }
            }
        ]
    }
}
