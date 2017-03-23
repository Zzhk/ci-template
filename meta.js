module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "IDG B-side Vue.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "unit": {
      "type": "confirm",
      "message": "Setup unit tests with Karma + Mocha?"
    },
    "example": {
      "type": "confirm",
      "message": "install with example?"
    }
  },
  "filters": {
    "config/test.env.js": "unit",
    "test/unit/**/*": "unit",
    "build/webpack.test.conf.js": "unit",
    "src/views/example.vue": "example"
  },
  "completeMessage": "To get started:\n\n  {{^inPlace}}cd {{destDirName}}\n  {{/inPlace}}npm install\n  npm run dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack"
};
