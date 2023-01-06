import { io } from 'socket.io-client';

// For development this should be set to localhost
// For example: SITE_URI=http://localhost
// When deployed this needs to be you actual site URI
// So you will need to add an environment variable for this
// when you deploy your site.
// Instructions for adding environment variables for
// production site are in the deploy guide.
// For example: SITE_URI=https://myawesomesite.com
const uri = `${process.env.SITE_URI}:${process.env.PORT}`;

export default (path = '/', options = {}) => {
  return io(uri + path, {
    autoConnect: false,
    ...options
  });
};
