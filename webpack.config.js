const path = require( 'path' );                                     /* Paquete nativo en Webpack */
const ExtratTextPlugin = require( 'extract-text-webpack-plugin' );  /* Plugin para extraer archivos de Texto (CSS) Requiere instalación */
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );       /* Plugin para Limpiar todo lo que esté en el directorio 'dist' Requiere instalación */

/* Cambiamos la exportación de un Objeto JSON a un Arroy Function para que pueda reconocer la variable de entorno 'env' */
module .exports = ( env ) => {
    /* Definición de Plugins */
    const plugins = [
        new ExtratTextPlugin( 'css/[name].[hash].css' )        /* Todos los archivos extraidos iran a esta ruta con nombres dinámicos*/
    ];

    /* Valida las variables de entorno de NODE definidas en el Script lanzado */
    if( env .NODE_ENV === 'production' ) {
        plugins .push(
            new CleanWebpackPlugin( [ 'dist' ], { root: __dirname } )
        );
    }

    return {
        entry: {
            invie: path .resolve( __dirname, 'src/index.js' )
        },
        output: {
            path: path .resolve( __dirname, 'dist' ),                /* Path de archivos de salida */
            filename: 'js/[name].[hash].js',                         /* Directorio de destino y nombre dinámico de archivos */
            publicPath: path .resolve( __dirname, 'dist' ) + '/',    /* Nombre del path público donde encontrará los archivos generados */
            chunkFilename: 'js/[id].[chunkhash].js'                  /* Como se van a llamar los fragmentos de código que estamos generando (en nuestro caso los módulos: 0.js )*/
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
                    /* Implementa el Plugin instalado (extract-text-webpack-plugin) */
                    use: ExtratTextPlugin .extract({
                        loader: 'css-loader',                       /* Interpresa el CSS */
                        options: {
                            minimize: true                          /* Minificación */
                        }
                    })
                },
                {
                    test: /\.(jpg|png|gif|svg)$/,                       /* Soporte para extenciones para imagenes */
                    loader: 'url-loader',
                    options: {
                        limit: 10000,                       /* Tamaño máximo */
                        fallBack: 'file-loader',            /* Por defecto usa 'publicPath' */
                        name: 'images/[name].[hash].[ext]'  /* Directorio de destino y nombre dinámico, hash dinámico y extensión dinámica de archivos */
                    }
                }
            ]
        },
        plugins
    }
}
