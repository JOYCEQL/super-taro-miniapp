const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora-classic');

const sourceFolder = 'demo';
const newFolderName = process.argv[2];

let spinner;
spinner = ora('Generate start');
spinner.start();

if (!sourceFolder || !newFolderName) {
  console.log(chalk.red('Usage: pnpm  generate projectName'));
  process.exit(1);
}

const sourceFolderPath = path.resolve(__dirname, '../packages', sourceFolder);
const sourceFolderName = path.basename(sourceFolder);

const parentFolder = path.dirname(sourceFolderPath);

const targetFolder = path.join(parentFolder, newFolderName);
const targetFolderPath = path.resolve(targetFolder);

if (!fs.existsSync(sourceFolderPath)) {
  spinner.fail(
    chalk.red(`Source folder '${sourceFolderPath}' does not exist.`)
  );
  process.exit(1);
}

if (fs.existsSync(targetFolderPath)) {
  spinner.fail(
    chalk.yellow(
      `Generate fail！Target folder '${targetFolderPath}' already exists.`
    )
  );
  process.exit(1);
}

// 创建文件夹
fs.mkdirSync(targetFolderPath);

spinner.text = chalk.green(`Created folder '${targetFolder}'.`);

function copyFolderRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  const files = fs.readdirSync(source);
  for (let file of files) {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyFolderRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

// 复制目录
copyFolderRecursive(sourceFolderPath, targetFolderPath);

// 修改子项目配置字段
function changeChildSetting() {
  const jsonArr = [
    'package.json',
    'project.tt.json',
    'project.config.json',
    'project.private.config.json',
  ];

  jsonArr.forEach((item) => {
    const targetJsonPath = path.join(targetFolderPath, item);
    const targetJsonStr = fs.readFileSync(targetJsonPath, 'utf-8');
    const targetJson = JSON.parse(targetJsonStr);
    if (item === 'package.json') {
      targetJson.name = newFolderName;
    } else {
      targetJson.projectname = newFolderName + '-minapp';
    }
    fs.writeFileSync(targetJsonPath, JSON.stringify(targetJson, null, 2));
  });

  spinner.text = chalk.green(
    `Copied folder '${sourceFolderName}' to '${targetFolderPath}'.`
  );
}
changeChildSetting();

// 修改根目录package.json-scripts
function changeRootSetting() {
  const rootPackageJsonPath = path.join(__dirname, '../package.json');
  const rootJsonStr = fs.readFileSync(rootPackageJsonPath, 'utf-8');
  const rootJson = JSON.parse(rootJsonStr);
  rootJson.scripts = Object.assign(rootJson.scripts, {
    [`dev:weapp:${newFolderName}`]: `pnpm -F ${newFolderName} dev:weapp`,
    [`build:weapp:${newFolderName}`]: `pnpm -F ${newFolderName} build:weapp`,
  });

  fs.writeFileSync(rootPackageJsonPath, JSON.stringify(rootJson, null, 2));

  spinner.text = chalk.green(
    chalk.bgGreen('DONE'),
    'Generate success!',
    `please run ${chalk.blue(`pnpm dev:weapp:${newFolderName}`)} to start`
  );

  spinner.succeed();
  spinner.stop();
}

changeRootSetting();
