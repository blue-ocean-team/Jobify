const router = require("express").Router();
const pool = require("./pool");

router
  .route("/:poster_id")
  .get(async (request, response) => {
    const poster_id = request.params.poster_id;
    const params = [poster_id];
    const result = await pool.query(
      "SELECT * FROM employers_blogs \
       WHERE poster_id = $1;",
      params
    );
    try {
      response.status(200).send(result);
    } catch (error) {
      console.error(error);
    }
  })

  .post(async (request, response) => {
    const poster_id = request.params.poster_id;
    const title = request.body.title;
    const public = request.body.public;
    const body = request.body.body;
    const created = new Date();
    const params = [poster_id, title, body, created, public];
    console.log("params", params);

    const result = pool.query(
      "INSERT INTO employers_blogs(poster_id, title, body, created, public) \
      VALUES($1, $2, $3, $4, $5)",
      params
    );

    try {
      response.status(201).send(result);
    } catch (error) {
      console.error(error);
    }
  })

  .put(async (request, response) => {
    const id = request.params.id;
    const title = request.body.title;
    const body = request.body.body;
    const public = request.body.public;

    const params = [id, title, body, public];

    const result = pool.query(
      "UPDATE employers_blogs \
      SET title = $2, \
      body = $3, \
      public = $4, \
      WHERE id = $1",
      params
    );
    try {
      response.status(201).send(result);
    } catch (error) {
      console.error(error);
    }
  })

  .delete(async (request, response) => {
    const id = request.params.poster_id;
    const params = [id];
    const result = pool.query(
      "DELETE FROM employers_blogs \
       WHERE id = $1;",
      params
    );
    console.log(params);
    try {
      response.status(202).send(result);
    } catch (error) {
      console.error(error);
    }
  });

router.route("/all/:poster_id").get(async (request, response) => {
  const poster_id = request.params.poster_id;
  const params = [poster_id];
  const result = await pool.query(
    "SELECT * FROM employers_blogs \
    UNION ALL SELECT * FROM seekers_blogs;"
  );
  try {
    response.status(200).send(result);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
