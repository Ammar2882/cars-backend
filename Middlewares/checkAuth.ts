
import jwt from 'jsonwebtoken'
export const checkAuth = (req:any, res:any, next:any) => {
	const token = req.headers.authorization;
	// check jwt exists and is verified
	if (token) {
		jwt.verify(token, process.env.SECRET_KEY, (err:any, decodedToken:any) => {
			if (err) {
				console.log(err.message);
				res.status(403).json({message:'forbidden'})
			} else {
				req.user = decodedToken;
				next();
			}
		});
	} else {
		res.status(403).json({message:'forbidden'})
	}
};

