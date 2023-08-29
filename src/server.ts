import app from './app';

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log('REST API server ready at: http://localhost:' + port),
);
