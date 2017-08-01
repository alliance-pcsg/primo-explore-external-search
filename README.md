# primo-explore-external-search
a primo-explore module that adds facet options to transfer a search to external targets.

## installation

```js
var app = angular.module('viewCustom', ['externalSearch']);
```

## configuration

### example

```js
angular.module('externalSearch').config(
  function ($provide) {
    $provide.value('collapsed', false)
    $provide.value('targets', [
      {
        "name": "Worldcat",
        "url": "https://www.worldcat.org/search?queryString=",
        "img": "https://cdn.rawgit.com/Alliance-PCJWG/primo-explore-worldcat-button/7ee112df/img/worldcat-logo.png",
        mapping: function(search) {
          const type_mappings = {
            "any": "kw",
            "title": "ti",
            "creator": "au",
            "subject": "su"
          }
          let terms = search.split(",");
          let type = type_mappings[terms[0]] || "kw";
          let query = terms[2] || "";
          return type + ':' + query;
        }
      },
      {
        "name": "Google Scholar",
        "url": "https://scholar.google.com/scholar?q=",
        "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png",
        mapping: function(search) {
          let terms = search.split(",");
          return terms[2] || "";
        }
      }
    ])
  }
)
```
