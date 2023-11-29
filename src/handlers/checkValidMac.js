const macAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

const checkValidMac = (mac) => {
  return macAddressRegex.test(mac);
};

export default checkValidMac;
