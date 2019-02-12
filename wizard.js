"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const beautify = require("json-beautify");

class Wizard {
  constructor() {
    this._extensionId;
    this._developerID;
    this._createdBy;
    this._extensionName;
    this._description;
    this._version = 1;
    //YYYY-MM-DD
    this._created = Wizard.creationDate();
    this._path = os.homedir();
  }

  set extensionId(ext) {
    if (ext.length === 36) {
      this._extensionId = ext;
    } else {
      throw new Error(
        "Extension ID not valid, it must be a string made of 36 characters: \n\r"
      );
    }
  }

  get extensionId() {
    return this._extensionId;
  }

  set developerID(devId) {
    if (isNaN(devId)) {
      throw new Error("Developer ID not valid");
    } else {
      this._developerID = devId;
    }
  }

  get developerID() {
    return this._developerID;
  }

  set createdBy(created_by) {
    if (created_by.length !== 0) {
      this._createdBy = created_by;
    } else {
      throw new Error("Created By is not valid");
    }
  }

  get createdBy() {
    return this._createdBy;
  }

  set extensionName(name) {
    if (name.length !== 0) {
      this._extensionName = name.replace(/\s/g, "").toLocaleLowerCase();
    } else {
      throw new Error("Extension name is not valid");
    }
  }

  get extensionName() {
    return this._extensionName;
  }

  set description(desc) {
    if (desc.length !== 0) {
      this._description = desc;
    } else {
      throw new Error("Extension name is not valid");
    }
  }

  get description() {
    return this._description;
  }

  /**
   * Set a creation date when the object is instantiated
   */
  static creationDate() {
    let date = new Date();
    let month = date.getMonth();
    if (month.toString().length === 1) {
      month = "0" + (month + 1).toString();
    }
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  }

  /**
   * Create the ext.json file
   */
  createExtJson() {
    let jsonFile = {
      extensionID: this._extensionId,
      developerID: this._developerID,
      createdBy: this._createdBy,
      name: this._extensionName,
      version: this._version,
      timeCreated: this._created,
      description: this._description
    };

    return beautify(jsonFile, null, 2, 80);
  }

  /**
   * Create the widget.json file
   */
  createWidgetJson() {
    let wjsonFile = {
      name: this._extensionName,
      version: 1,
      global: false,
      javascript: "widget-javascript",
      pageTypes: ["home"],
      imports: ["products"],
      jsEditable: true,
      config: {}
    };

    return beautify(wjsonFile, null, 2, 80);
  }

  /**
   * Create the JS file
   */
  createJavascriptFile() {
    let jsFile = `
      // Javascript widget file
      define(
        // Dependencies
        ['knockout', 'jquery'],
        // Module Implementation
        function($, ko) {
           // We recommend enabling strict checking mode
           'use strict';
           // Private variables and functions can be defined here...
           var SOME_CONSTANT = 1024;
           var privateMethod = function () {
             // ...
           };
           return {
            // Widget JS
            // Some member variables...
            // Some public methods...
          }
      });`;

    return jsFile;
  }

  /**
   * Create the display.template file
   */
  createTheHtmlTemplate() {
    let display = `
      <!-- Template File -->
      <div class="myWidget">Hello World</div>`;

    return display;
  }

  /**
   * Create the widget.less file
   */
  createTheLessFile() {
    let wCss = `
    /* Widget CSS Less */
    .myWidget {}`;

    return wCss;
  }

  /**
   * Create the base folder structure for the widget
   */
  createProjectStructure() {
    const curDir = path.resolve(this._path);

    try {
      if (!fs.existsSync(curDir)) {
        return "The widget folder already exists in you HDD";
      } else {
        // create the container folder
        fs.mkdirSync(`${curDir}/${this._extensionName}`);

        //create the widget folder
        fs.mkdirSync(`${curDir}/${this._extensionName}/widget`);

        // create the widget name folder
        fs.mkdirSync(
          `${curDir}/${this._extensionName}/widget/${this._extensionName}`
        );

        //create the js folder
        fs.mkdirSync(
          `${curDir}/${this._extensionName}/widget/${this._extensionName}/js`
        );

        //create the less folder
        fs.mkdirSync(
          `${curDir}/${this._extensionName}/widget/${this._extensionName}/less`
        );

        //create the template folder
        fs.mkdirSync(
          `${curDir}/${this._extensionName}/widget/${
            this._extensionName
          }/templates`
        );

        //create the config folder
        fs.mkdirSync(
          `${curDir}/${this._extensionName}/widget/${
            this._extensionName
          }/config`
        );

        // create the ext.json file
        fs.writeFile(
          `${curDir}/${this._extensionName}/ext.json`,
          this.createExtJson(),
          error => {
            if (error) {
              throw new Error("Cannot write file ext.json");
            }
          }
        );

        //create the widget.json file
        fs.writeFile(
          `${curDir}/${this._extensionName}/widget/${
            this._extensionName
          }/widget.json`,
          this.createWidgetJson(),
          error => {
            if (error) {
              throw new Error("Cannot write file widget.json");
            }
          }
        );

        //create the javascript file
        fs.writeFile(
          `${curDir}/${this._extensionName}/widget/${
            this._extensionName
          }/js/widget-javascript.js`,
          this.createJavascriptFile(),
          error => {
            if (error) {
              throw new Error("Cannot write file widget-javascript.js");
            }
          }
        );

        //create the display.template file
        fs.writeFile(
          `${curDir}/${this._extensionName}/widget/${
            this._extensionName
          }/templates/display.template`,
          this.createTheHtmlTemplate(),
          error => {
            if (error) {
              throw new Error("Cannot write display.template file");
            }
          }
        );

        //create the widget.less file
        fs.writeFile(
          `${curDir}/${this._extensionName}/widget/${
            this._extensionName
          }/less/widget.less`,
          this.createTheLessFile(),
          error => {
            if (error) {
              throw new Error("Cannot write widget.less file");
            }
          }
        );

        var result = {
          status: 200,
          directory: curDir,
          extension: this._extensionName
        };

        return result;
      }
    } catch (error) {
      return "There was an error generating the file";
    }
  }
}

module.exports = Wizard;
