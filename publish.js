const fs = require('fs');
const path = require('path');

function main() {
  const buildDir = path.resolve('../proj_auto_camera/build');
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

  const outPath = path.resolve('./build/index.html');
  fs.writeFileSync(outPath, newHTML);
  console.log(`Save file to ${outPath}`);
}

main();
