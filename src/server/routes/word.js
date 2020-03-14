import express from 'express';
import fs from 'fs'
import { config } from '../utils';
import _ from 'lodash'
// https://stackoverflow.com/questions/12809068/create-an-empty-file-in-node-js

const router = express.Router();

router.post('/', (req, res) => {
  const { fileName, content, pass } = req.body;
  const filePath = `${process.cwd()}/src/tmp/${fileName}`;
  const curFileInf = config[fileName]
  const checkPass = curFileInf.locked
  if ((fs.existsSync(filePath) && !checkPass) || (fs.existsSync(filePath) && curFileInf.locked && pass === curFileInf.pass)) {
    fs.writeFileSync(filePath, content);
    return res.send({
      status: 'write successfully',
    });
  }
  return res.send({
    status: 'wrong pass',
  });
});

router.get("/", (req, res) => {
  const { fileName, pass } = req.query;
  const filePath = `${process.cwd()}/src/tmp/${fileName}`;
  const configPath = `${process.cwd()}/src/server/utils/config.json`;
  if (!fs.existsSync(filePath)) {
    config[fileName] = {
      "name": fileName,
      "locked": false,
      "edit": true,
      "pass": "",
      "user": "cee"
    }
    fs.writeFileSync(configPath, JSON.stringify(config))
    fs.writeFileSync(filePath, '')
  }
  // return res.send({ oke: 'hello' })
  const content = fs.readFileSync(filePath, 'utf8');
  const curFileInf = config[fileName]
  if (curFileInf.locked && pass === curFileInf.pass) {
    return res.send({
      content: content,
      locked: curFileInf.locked,
      edit: curFileInf.edit
    });
  }
  if (curFileInf.locked && pass !== curFileInf.pass) {
    return res.send({
      status: 'can not view, please enter correct password'
    });
  }
  return res.send({
    content: content,
    locked: curFileInf.locked,
    edit: curFileInf.edit
  });

});

export default router;