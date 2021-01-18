const getYamlBlock = (yamlData, blockName) => {
  return yamlData.filter(yml => yml.node.fields.folder === blockName);
};

const getYamlFile = (yamlData, folder, subFolder, filename) => {
  return yamlData.filter(
    yml =>
      yml.node.fields.folder === folder &&
      yml.node.fields.subFolder === subFolder &&
      yml.node.fields.filename === filename,
  );
};

const getYamlSubFolder = (yamlData, folder, subFolder) => {
  return yamlData.filter(
    yml =>
      yml.node.fields.folder === folder &&
      yml.node.fields.subFolder === subFolder,
  );
};

module.exports = {
  getYamlBlock,
  getYamlFile,
  getYamlSubFolder,
};
