### nepali fm player

* cloned from：https://github.com/worldzhao/url-music-player

used languages
1. Html
2. Css
3. JavaScript

### http and https mixed content issue

as chrome dont want to load mixed content.live demo may not load http media sources 
on github page.however users can clone repo and use locally on pc without errors.
if one want to embed on website i would suggest not to use https on webpage because live streams are on http connection.
as of today firefox loads page with showing not secure on addressbar.

### want to contribute?

fork repo and make changes then send pull requests.

### playlist file

on folder js/playlist.js file there are links for live streams.
playlist format is:
 
```javascript
{
                        src:'https://stream1.radionepal.gov.np/live/',
                        name:'Radio Nepal',
                        author:'am/sw/fm radio',
                        cover:'img/radionepal.png'
                    },            
                    {
                        src:'https://radio-broadcast.ekantipur.com/stream/',
                        name:'Kantipur Fm',
                        author:'91.2 MHZ kathmandu',
                        cover:'https://radio-jcss-cdn.ekantipur.com/images/kfm_logo.png'
                    },
```
