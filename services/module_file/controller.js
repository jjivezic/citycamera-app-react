var error = require('../../lib/error').error;
var provider = require('./providers/');



// exports.uploadedAmazon = function (req, res, next) {
//   provider.upload(req, res).then(function (data) {
//     res.status(200);
//     res.json({
//       isSuccess: true,
//       message: 'Image uploaded!'
//     });
//   }).fail(function (err) {
//     logger.error('ERROR CTRL - upload img', err);
//     return next(err);
//   });
// };
exports.upload = function (req, res, next) {
  provider.upload(req, res).then(function (data) {
    res.status(200);
    res.json({
      isSuccess: true,
      message: 'Image uploaded!'
    });
  }).fail(function (err) {
    logger.error('ERROR CTRL - upload img', err);
    return next(err);
  });
};
exports.getUploadURL = function (req, res, next) {

  var fileName = req.body.file;
  var fileExt = req.body.ext;
  var userId = req.params.userId;
  console.log('url',fileName,fileExt)
  provider.getUploadURL(userId, fileName, fileExt).then(function (url) {
    res.status(200);
    res.json(url);
  }).fail(function (err) {
    logger.error('ERROR CTRL - get URL to upload', err);
    return next(err);
  });
};

exports.folders = function (req, res, next) {
  provider.folders().then(function (folders) {
    res.status(200);
    res.json({
      folders: folders
    });
  }).fail(function (err) {
    logger.error('ERROR CTRL - list all folders ', err);
    return next(err);
  });
};
exports.foldersByUserId = function (req, res, next) {
  var userId = req.params.userId;

  provider.foldersByUserId(userId).then(function (folders) {
    res.status(200);
    res.json({
      folders: folders
    });
  }).fail(function (err) {
    logger.error('ERROR CTRL - list all folders by User Id', err);
    return next(err);
  });
};

exports.files = function (req, res, next) {

  var folder = req.params.folder;
  provider.files(folder).then(function (files) {
    res.status(200);
    res.json(files);
  }).fail(function (err) {
    logger.error('ERROR CTRL - list all files', err);
    return next(err);
  });
};

exports.filesByUserId = function (req, res, next) {

  var userId = req.params.userId;
  var folder = req.params.folder;

  provider.filesByUserId(userId, folder).then(function (files) {
    res.status(200);
    res.json(files);
  }).fail(function (err) {
    logger.error('ERROR CTRL - list all files by user ID', err);
    return next(err);
  });
};

exports.deleteFile = function (req, res, next) {

  var fileId = req.params.fileId;
  var userId = req.params.userId;

  provider.deleteFile(userId, fileId).then(function (err) {
    res.status(200);
    res.json({
      success: true
    });
  }).fail(function (err) {
    logger.error('ERROR CTRL - delete files', err);
    return next(err);
  });
};

exports.adminDeleteFile = function (req, res, next) {

  var fileId = req.params.fileId;
  provider.deleteFileAdmin(fileId).then(function (err) {
    res.status(200);
    res.json({
       success: true
    });
  }).fail(function (err) {
    logger.error('ERROR CTRL - delete files', err);
    return next(err);
  });
};