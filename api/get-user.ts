import { NowRequest, NowResponse } from '@vercel/node';


export default (req: NowRequest, res: NowResponse) => {
    res.status(200);
    res.json({ name: 'John', email: 'john@example.com' });
};
