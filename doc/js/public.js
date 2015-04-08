var themes = [
    {id: 0, name: 'core'},
    {id: 1, name: 'default'},
    {id: 2, name: 'flat'}
];

var themeSelectEx = new RGUI.SelectEx({
    data: {
        source: themes,
        selected: themes[1],
        placeholder: null
    }
}).$inject('#j-themeSelectEx')
  .$on('select', function($event) {
    var themeCSS = document.getElementById('j-themeCSS');
    themeCSS.href = window.relativePath + 'css/' + $event.selected.name + '.css';
});
