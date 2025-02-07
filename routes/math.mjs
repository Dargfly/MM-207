import HTTP_CODES from "../utils/httpCodes.mjs";

//  Addition---------------------------------------------------
export function getAddition(req, res, next) {
  const a = Number(req.params.a);
  const b = Number(req.params.b);
  let answer = null;
  if (isNaN(a) || isNaN(b)) {
    answer = "The URL prompted does not have a valid number";
  } else {
    answer = a + b;
  }

  res.status(HTTP_CODES.SUCCESS.OK).send(answer.toString()).end();
}