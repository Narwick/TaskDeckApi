/* eslint-disable consistent-return */
const path = require(`path`);

class ValidateFiles {
  resultValidateExtensions = false;

  resultValidateTypes = false;

  constructor(file) {
    this.file = file;
    this.isArray = Array.isArray(file);
  }

  validateExetensions(acceptedExtensions = ['pdf', 'jpg', 'doc', 'docx']) {
    this.acceptedExtensions = acceptedExtensions;
    return this.isArray ? this.validateEXMultiples() : this.valiteExOne(this.file);
  }

  valiteExOne(file) {
    const ext = path.extname(file.name).replace('.', '');
    this.acceptedExtensions.forEach((aE) => {
      if (ext === aE) {
        this.resultValidateExtensions = true;
      }
    });
    return this.resultValidateExtensions;
  }

  validateEXMultiples() {
    this.file.forEach((file) => {
      const result = this.valiteExOne(file);
      if (!result) return this.resultValidateExtensions;
    });
    return this.resultValidateExtensions;
  }

  validateTypes(acceptedExtensions = ['pdf', 'doc', 'image']) {
    this.acceptedExtensions = acceptedExtensions;
    return this.isArray ? this.validateTypeMultiples() : this.valiteTypeOne(this.file);
  }

  valiteTypeOne(file) {
    const ext = path.extname(file.name).replace('.', '');
    this.acceptedExtensions.forEach((aE) => {
      if (ext !== aE) this.resultValidateTypes = false;
    });
  }

  validateTypeMultiples() {
    this.file.forEach((file) => this.valiteTypeOne(file));
  }
}

module.exports = { ValidateFiles };
