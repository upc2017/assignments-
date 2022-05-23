const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.2'});

const doc = {
    info: {
        title: 'My API',
        description: 'Description',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    components:{
        schemas:{
            Document: {
                creat_name: "creat_name",
                creat_title: "creat_title",
                creat_Details: "creat_Details",
                time: "Date",
                creat_image_url: "creat_image_url"
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);