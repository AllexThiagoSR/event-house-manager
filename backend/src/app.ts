import * as express from 'express';
import * as cors from 'cors';
export class App {
  private app = express();

  constructor() {
    this.config();
    this.app.get('/', (_req, res) => res.status(200).json('APP is running'));
    // this.routers();
  }
  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };
    
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: number | string) {
    this.app.listen(PORT);
  }
}

export default new App();
