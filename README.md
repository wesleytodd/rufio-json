# Rufio JSON

A Rufio plugin to output json of your content items.  This can then be used by front-end javascript to create single page apps.

Install the plugin:

	$ npm install --save rufio-json

Then add `json` to your enabled plugins in your projects `rufio.json` file and configure the plugin:

```
{
	"plugins": {
		"active": [
			"json"
		]
	}
}
```

Also, you are required to define a json permalink structure for each type:

```
{
	"types": {
		"post": {
			"jsonPermalink": "<%= meta.slug %>.json"
		}
	}
}
```
