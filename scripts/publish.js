const fs = require('fs');
const path = require('path');

function main() {
  const buildDir = path.resolve('../idxp-camera-app/build');
  if (!fs.existsSync(buildDir)) {
    throw new Error(`${buildDir}:  project directory does not exist`);
  }

  const htmlPath = `${buildDir}/index.html`;
  if (!fs.existsSync(`${htmlPath}`)) {
    throw new Error(`${htmlPath}: file does not exist`);
  }
  const html = fs.readFileSync(htmlPath).toString();

  const jsPath =
    `${buildDir}/static/js/` + html.match(/main\.[a-zA-Z\d_-]+\.js/)[0];

  const cssPath =
    `${buildDir}/static/css/` + html.match(/main\.[a-zA-Z\d_-]+\.css/)[0];

  if (!fs.existsSync(`${cssPath}`)) {
    throw new Error(`${cssPath}: file does not exist`);
  }

  if (!fs.existsSync(`${jsPath}`)) {
    throw new Error(`${jsPath}: file does not exist`);
  }

  const js = fs.readFileSync(jsPath).toString();
  const css = fs.readFileSync(cssPath).toString();

  const newHTML = [
    html
      .replace(/<script[^>]*>/g, `<script>`)
      .replace(/<link[^>]*>/g, `<link />`),
    `<script>`,
    js,
    '</script>',
    `<style>`,
    css,
    '</style>',
  ].join('\n\n');

  //  console.log(jsPath);
  //console.log(cssPath);

  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const dateString = `${year}-${month}-${day}_${hours}_${minutes}`;

  const outPath = path.resolve('./build/index.html');
  const outPathVersioned = path.resolve(`./build/index-${dateString}.html`);
  fs.writeFileSync(outPath, newHTML);
  fs.writeFileSync(outPathVersioned, newHTML);
  console.log(`Save file to ${outPath}`);
  console.log(`Save file to ${outPathVersioned}`);
}

try {
  main();
} catch (ex) {
  console.log('=================================================');
  console.error(ex);
  console.log('=================================================');
  throw ex;
}
