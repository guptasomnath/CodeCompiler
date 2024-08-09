const fs = require("fs");
const { spawn } = require("node:child_process");
const { pLanguageInfo } = require("../constant");

const writeFile = (userCode, pLanguageKey) => {
  return new Promise((resolve, rejects) => {
    const pLExtension = pLanguageInfo[pLanguageKey].fileExtension;
    const fileName = `user${Math.floor(
      Math.random() * 1000000
    )}Code${pLExtension}`;

    const filePath = `./userscode/${fileName}`;

    fs.writeFile(filePath, userCode, (error) => {
      if (error) {
        return rejects(error);
      }
      resolve(filePath);
    });
  });
};

const compileCode = async (userCode, pLanguageKey, res) => {
  const filePath = await writeFile(userCode, pLanguageKey);

  const command = pLanguageInfo[pLanguageKey].command;

  return new Promise((resolve, rejects) => {
    const childProcess = spawn(command, [filePath]);

    childProcess.stdout.on("data", (result) => {
      res.write(result);
    });

    childProcess.stderr.on("data", (error) => {
      res.write(error);
    });

    childProcess.on("close", (code) => {
      res.end();
      childProcess.kill();
      if (code === 0) {
        resolve();
      } else {
        rejects("Some Error Happend");
      }

      fs.unlink(filePath, (err) => {});
    });

    childProcess.on("error", (err) => {
      res.end();
      childProcess.kill();
      rejects(err);
    });
  });
};

module.exports = {
  compileCode,
};
