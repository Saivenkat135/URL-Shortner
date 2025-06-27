import axios from 'axios';

const Log = async (stack, level, pkg, message) => {
  try {
    await axios.post('http://your-log-server.com/log', {
      stack,
      level,
      package: pkg,
      message,
    });
  } catch (err) {
    console.error('[Logging Failed]', err.message);
  }
};

export default Log; 
