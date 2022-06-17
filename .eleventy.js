const brokenLinksPlugin = require("eleventy-plugin-broken-links");
const isProduction = process.env.NODE_ENV === "prod";

console.log(process.env.NODE_ENV);

module.exports = function(eleventyConfig) {
	eleventyConfig.addPlugin(brokenLinksPlugin,{
		broken: "error",
	});
	eleventyConfig.addPassthroughCopy("src/css");
	eleventyConfig.addPassthroughCopy("src/js");
	eleventyConfig.addPassthroughCopy("src/img");
	eleventyConfig.addPassthroughCopy("src/files");

	return {
		pathPrefix: isProduction ? "" : "/mybus-v2/",
		dir: {
			input: "src",
			output: "docs"
		}
	};
};