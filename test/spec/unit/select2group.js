var expect = require('expect.js');
var Select2Group = require('../../../src/js/unit/select2Group.js');

describe('Select2Group', function() {
    describe('initialized', function() {
        var source = [
            {name: '理学', children: [
                {name: '物理学', children: [
                    {name: '理论物理'},
                    {name: '凝聚态物理'},
                    {name: '材料物理'}
                ]},
                {name: '数学', children: [
                    {name: '基础数学'},
                    {name: '计算数学'},
                    {name: '应用数学'}
                ]},
                {name: '化学'}
            ]},
            {name: '工学', children: [
                {name: '计算机科学与技术', children: [
                    {name: '计算机系统结构'},
                    {name: '计算机软件与理论'},
                    {name: '计算机应用技术'}
                ]},
                {name: '软件工程'},
                {name: '机械工程', children: [
                    {name: '机械制造及其自动化'},
                    {name: '机械电子工程'},
                    {name: '机械设计及理论'},
                    {name: '车辆工程'}
                ]}
            ]}
        ];

        var select2Group = new Select2Group({
            data: {
                source: source,
                depth: 3
            }
        });

        it('should change `sources`.', function() {
            select2Group.data.selecteds[0] = source[0];
            select2Group.$update();

            expect(select2Group.data.sources[1]).to.be(source[0].children);
        });

        it('should change `selected`.', function() {
            select2Group.data.selecteds[1] = source[0].children[1];
            select2Group.data.selecteds[2] = source[0].children[1].children[2];
            select2Group.$update();

            expect(select2Group.data.selected).to.be(source[0].children[1].children[2]);
        });

        it('should clear `sources`.', function() {
            select2Group.data.selecteds[0] = undefined;
            select2Group.$update();

            expect(select2Group.data.sources[1]).to.be(undefined);
            expect(select2Group.data.sources[2]).to.be(undefined);
            expect(select2Group.data.selected).to.be(undefined);
        });

        it('should select correct item by `key` and `values`.', function() {
            select2Group.data.key = 'name';
            select2Group.data.values = ['工学', '机械工程', '车辆工程'];
            select2Group.$update();

            expect(select2Group.data.selected).to.be(source[1].children[2].children[3]);
        });
    });
});

