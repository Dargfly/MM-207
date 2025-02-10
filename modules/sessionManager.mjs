import session from "express-session";
import cookieParser from "cookie-parser";

//  Session Manager ----------------------------------------------------------
export const setupSession = (server) => {
  server.use(cookieParser());

  server.use(
    session({
      secret: "hemmelig_nokkel",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 dag
      },
    })
  );
};


export const loginUser = (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send("Brukernavn kreves!");
  }

  req.session.user = { username, isAuthenticated: true };  // Lagre i session
  res.send(`Bruker ${username} er logget inn!`);
};

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Feil ved sletting av sesjon");
    }
    res.clearCookie('connect.sid');  // Slett sesjons-cookie
    res.send('Du har logget ut!');
  });
};

// Middleware for å sjekke om bruker er innlogget
export const checkAuthentication = (req, res, next) => {
  if (req.session.user && req.session.user.isAuthenticated) {
    next();  // Brukeren er autentisert, gå videre
  } else {
    res.status(403).send('Du er ikke logget inn!');
  }
};