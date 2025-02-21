import express from "express";
import bodyParser from "body-parser";
import { renderToStaticMarkup } from '@usewaypoint/email-builder';
import basicAuth from "express-basic-auth";

const app = express();
app.disable("x-powered-by");
app.use(bodyParser.json());

const basePath = "https://raw.githubusercontent.com/hotaydev/emails-by-template/refs/heads/main/emails";

if (process.env.USE_BASIC_AUTH) {
  app.use(basicAuth({
    users: { admin: process.env.BASIC_AUTH_TOKEN },
  }));
}

app.get("/", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send(JSON.stringify({ success: false, message: "Missing email parameter" }));
  }

  return await fetch(`${basePath}/${email}.json`)
    .then((emailResponse) => emailResponse.json())
    .then((data) => {
      const htmlEmail = renderToStaticMarkup(data, { rootBlockId: 'root' });
      return res.status(200).send(JSON.stringify({ success: true, message: htmlEmail }));
    })
    .catch((err) => {
      return res.status(500).send(JSON.stringify({ success: false, message: err.message }));
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});