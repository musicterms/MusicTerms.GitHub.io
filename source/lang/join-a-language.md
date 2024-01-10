# Join a new language (that is not exsiting) in this Web App.

Here is a list of things you have to change:

> Let L be the short name (en, zh, af, ar-AE, ...)

- Create `/L and copy` from any other pre-existing language file excluding `/en`.

- Copy the `languages` JSON in  `/source/lang/translate.js` to `/source/lang/addlang.html`'s first `textarea` and replace the tranlation of new language in the third `textarea` and type L in `input` box and press the button. Paste it back to `translate.js`.

- Update all JSON files in `/source` with `/source/lang/translator.html`. For `/source/terms/`, comment the first part spilt by the space and uncomment the second part. If not, reverse it.

- In `/js/index.js`, update line 19 (around), the `k == '' || k == '' || ...) loadTerms(json)`. Make a new condition as `k == L`.

- Update `/language.html`