class SemanticVersion {
  constructor(strVersion) {
    const versionArray = strVersion.split(".");
    const hasPreReleaseVersion = versionArray[2].includes('-');
    function extractPatchVersion(versionArrayElement) {
      return versionArrayElement.substring(0, versionArrayElement.indexOf('-'));
    }
    function extractPreReleaseVersion(versionArrayElement) {
      return versionArrayElement.substring(versionArrayElement.indexOf('-') + 1, versionArrayElement.length);
    }
    this.majorVersion = versionArray[0];
    this.minorVersion = versionArray[1];
    this.patchVersion = hasPreReleaseVersion ? extractPatchVersion(versionArray[2]) : versionArray[2];
    this.preReleaseVersion = hasPreReleaseVersion ? extractPreReleaseVersion(versionArray[2]) : null;
  }
  getMajorVersion() {
    return this.majorVersion;
  }
  getMinorVersion() {
    return this.minorVersion;
  }
  getPatchVersion() {
    return this.patchVersion;
  }
  getPreReleaseVersion() {
    return this.preReleaseVersion;
  }
}

// I changed the name of the function to be 'isLowerPrecedence' since it makes more sense when returning a boolean value
const isLowerPrecedence = (semVer1, semVer2) => {
  const version1 = new SemanticVersion(semVer1);
  const version2 = new SemanticVersion(semVer2);
  const majorVersionDifferent = version1.getMajorVersion() !== version2.getMajorVersion();
  const minorVersionDifferent = version1.getMinorVersion() !== version2.getMinorVersion();
  const patchVersionDifferent = version1.getPatchVersion() !== version2.getPatchVersion();
  const preReleaseVersionDifferent = version1.getPreReleaseVersion() !== version2.getPreReleaseVersion();

  if (majorVersionDifferent) {
    if (version1.getMajorVersion() < version2.getMajorVersion()) return true;
    return false;
  }
  if (minorVersionDifferent) {
    if (version1.getMinorVersion() < version2.getMinorVersion()) return true;
    return false;
  }
  if (patchVersionDifferent) {
    if (version1.getPatchVersion() < version2.getPatchVersion()) return true;
    return false;
  }
  if (preReleaseVersionDifferent) {
    // Simplifying this step because this ain't trivial business lol
    const pre1 = version1.getPreReleaseVersion();
    const pre2 = version2.getPreReleaseVersion();
    const version1HasPreRelease = Boolean(pre1);
    const version2HasPreRelease = Boolean(pre2);
    const bothHavePreRelease = Boolean(pre1) && Boolean(pre2);

    if (bothHavePreRelease) {
      if (pre1.length < pre2.length) return true;
      return false;
    }
    if (version1HasPreRelease) {
      return true;
    }
    if (version2HasPreRelease) {
      return false
    }
    return false;
  }
  return false;
};
