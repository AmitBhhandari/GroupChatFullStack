const S3Services = require("../services/s3group");

const postmedia = async (req, res, next) => {
  try {
    const user = req.user;
    const groupid = req.params.groupid;
    const fileData = req.file.buffer;
    const filename = req.file.originalname;

    const fileURL = await S3Services.uploadS3(fileData, filename);
    const response = await user.createMessage({
      message: fileURL,
      Username: user.name,
      groupId: groupid,
    });

    return res.status(201).json({ response, url: fileURL, success: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { postmedia };
