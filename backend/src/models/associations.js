import { Post } from "./Post.js";
import { Media } from "./Media.js";

export function setupAssociations() {
  Post.hasMany(Media, { as: "media", foreignKey: "post_id" });
  Media.belongsTo(Post, { as: "post", foreignKey: "post_id" });
}