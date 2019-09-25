module.exports = {
  branch: 'master',
  fail: false,
  plugins: [
    [
      '@semantic-release/git',
      {
        assets: [],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
