const Wizard = require("./wizard");

let wizard = new Wizard();

/**
 * Download created project
 * @param {*} req
 * @param {*} res
 */
module.exports = function downloadProject(req, res) {
  try {
    wizard.extensionId = req.body.extId;
    wizard.developerID = req.body.devId;
    wizard.extensionName = req.body.extName;
    wizard.developerName = req.body.devName;
    wizard.extensionDescription = req.body.extDesc;

    const result = wizard.createProjectStructure();

    res.status(200).send({ message: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
