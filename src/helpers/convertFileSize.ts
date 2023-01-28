const convertFileSize = (fileSizeInBytes: number) => {
  var i = -1;
  var byteUnits = [" KB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
  do {
    fileSizeInBytes /= 1024;
    i++;
  } while (fileSizeInBytes > 1024);

  return Math.ceil(Math.max(fileSizeInBytes, 0.1)) + byteUnits[i];
};

export default convertFileSize;
