module.exports = (sequelize, DataTypes) => {
  const repoDetailsSchema = sequelize.define('repoDetails', {
    id: { type: DataTypes.BIGINT, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    html_url: { type: DataTypes.STRING, allowNull: false},
    description: { type: DataTypes.TEXT, allowNull: true},
    created_at: { type: DataTypes.DATE, allowNull: false},
    open_issues: { type: DataTypes.BIGINT, allowNull: false},
    watchers: { type: DataTypes.BIGINT, allowNull: false },
    owner: { type: DataTypes.JSONB, allowNull: false}
  })
  return repoDetailsSchema
}