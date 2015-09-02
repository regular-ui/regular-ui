requirejs.config({
    baseUrl: '../../',
    paths: {
        Regular: 'vendor/regular.min',
        marked: 'vendor/marked.min'
    }
});

require(['js/regular-ui.min'], function(RGUI) {
    new RGUI.Calendar().$inject('#app');
});