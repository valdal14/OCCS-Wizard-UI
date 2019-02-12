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
    wizard.createdBy = req.body.devName;
    wizard.description = req.body.extDesc;

    const result = wizard.createProjectStructure();

    if (result === "The widget folder already exists in you HDD") {
      res.status(200).send({ message: result });
    } else {
      res.status(200).send({ message: result });
    }
  } catch (error) {
    res.status(200).send({ message: "There was an error generating the file" });
  }
};
