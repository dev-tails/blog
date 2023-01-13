import fs from "fs";
import express from "express";

const app = express();

app.get("/content/:slug", (req, res) => {
  const { slug } = req.params;
  const html = fs.readFileSync(`_posts/${slug}`);
  res.send(String(html));
});

app.get("/", (req, res) => {
  const filenames = fs.readdirSync(`_posts`);

  res.send(`
    <html>
      ${filenames.map((filename) => {
        return `<a href="/content/${filename}">${filename.replace(
          ".html",
          ""
        )}</a>`;
      })}
    </html>
  `);
});

app.listen(8080);
