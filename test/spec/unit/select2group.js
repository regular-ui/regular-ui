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
                source: source
            }
        });
    });
});

