var Plotly = require('@lib');
var Lib = require('@src/lib');

var Box = require('@src/traces/box');

var createGraphDiv = require('../assets/create_graph_div');
var destroyGraphDiv = require('../assets/destroy_graph_div');
var fail = require('../assets/fail_test');
var mouseEvent = require('../assets/mouse_event');

var customAssertions = require('../assets/custom_assertions');
var assertHoverLabelContent = customAssertions.assertHoverLabelContent;

describe('Test boxes supplyDefaults', function() {
    var traceIn;
    var traceOut;
    var defaultColor = '#444';
    var supplyDefaults = Box.supplyDefaults;

    beforeEach(function() {
        traceOut = {};
    });

    it('should set visible to false when x and y are empty', function() {
        traceIn = {};
        supplyDefaults(traceIn, traceOut, defaultColor);
        expect(traceOut.visible).toBe(false);

        traceIn = {
            x: [],
            y: []
        };
        supplyDefaults(traceIn, traceOut, defaultColor, {});
        expect(traceOut.visible).toBe(false);
    });

    it('should set visible to false when x or y is empty', function() {
        traceIn = {
            x: []
        };
        supplyDefaults(traceIn, traceOut, defaultColor, {});
        expect(traceOut.visible).toBe(false);

        traceIn = {
            x: [],
            y: [1, 2, 3]
        };
        supplyDefaults(traceIn, traceOut, defaultColor, {});
        expect(traceOut.visible).toBe(false);

        traceIn = {
            y: []
        };
        supplyDefaults(traceIn, traceOut, defaultColor, {});
        expect(traceOut.visible).toBe(false);

        traceIn = {
            x: [1, 2, 3],
            y: []
        };
        supplyDefaults(traceIn, traceOut, defaultColor, {});
        expect(traceOut.visible).toBe(false);
    });

    it('should set orientation to v by default', function() {
        traceIn = {
            y: [1, 2, 3]
        };
        supplyDefaults(traceIn, traceOut, defaultColor, {});
        expect(traceOut.orientation).toBe('v');

        traceIn = {
            x: [1, 1, 1],
            y: [1, 2, 3]
        };
        supplyDefaults(traceIn, traceOut, defaultColor, {});
        expect(traceOut.orientation).toBe('v');
    });

    it('should set orientation to h when only x is supplied', function() {
        traceIn = {
            x: [1, 2, 3]
        };
        supplyDefaults(traceIn, traceOut, defaultColor, {});
        expect(traceOut.orientation).toBe('h');

    });

    it('should inherit layout.calendar', function() {
        traceIn = {
            y: [1, 2, 3]
        };
        supplyDefaults(traceIn, traceOut, defaultColor, {calendar: 'islamic'});

        // we always fill calendar attributes, because it's hard to tell if
        // we're on a date axis at this point.
        expect(traceOut.xcalendar).toBe('islamic');
        expect(traceOut.ycalendar).toBe('islamic');
    });

    it('should take its own calendars', function() {
        traceIn = {
            y: [1, 2, 3],
            xcalendar: 'coptic',
            ycalendar: 'ethiopian'
        };
        supplyDefaults(traceIn, traceOut, defaultColor, {calendar: 'islamic'});

        // we always fill calendar attributes, because it's hard to tell if
        // we're on a date axis at this point.
        expect(traceOut.xcalendar).toBe('coptic');
        expect(traceOut.ycalendar).toBe('ethiopian');
    });

    it('should not coerce point attributes when boxpoints is false', function() {
        traceIn = {
            y: [1, 1, 2],
            boxpoints: false
        };
        supplyDefaults(traceIn, traceOut, defaultColor, {});

        expect(traceOut.boxpoints).toBe(false);
        expect(traceOut.jitter).toBeUndefined();
        expect(traceOut.pointpos).toBeUndefined();
        expect(traceOut.marker).toBeUndefined();
        expect(traceOut.text).toBeUndefined();
    });

    it('should default boxpoints to suspectedoutliers when marker.outliercolor is set & valid', function() {
        traceIn = {
            y: [1, 1, 2],
            marker: {
                outliercolor: 'blue'
            }
        };
        supplyDefaults(traceIn, traceOut, defaultColor, {});
        expect(traceOut.boxpoints).toBe('suspectedoutliers');
    });

    it('should default boxpoints to suspectedoutliers when marker.line.outliercolor is set & valid', function() {
        traceIn = {
            y: [1, 1, 2],
            marker: {
                line: {outliercolor: 'blue'}
            }
        };
        supplyDefaults(traceIn, traceOut, defaultColor, {});
        expect(traceOut.boxpoints).toBe('suspectedoutliers');
        expect(traceOut.marker).toBeDefined();
        expect(traceOut.text).toBeDefined();
    });
});

describe('Test box hover:', function() {
    var gd;

    afterEach(destroyGraphDiv);

    function run(specs) {
        gd = createGraphDiv();

        var fig = Lib.extendDeep(
            {width: 700, height: 500},
            specs.mock || require('@mocks/box_grouped.json')
        );

        if(specs.patch) {
            fig = specs.patch(fig);
        }

        var pos = specs.pos || [200, 200];

        return Plotly.plot(gd, fig).then(function() {
            mouseEvent('mousemove', pos[0], pos[1]);
            assertHoverLabelContent(specs);
        });
    }

    [{
        desc: 'base',
        nums: ['median: 0.55', 'min: 0', 'q1: 0.3', 'q3: 0.6', 'max: 0.7'],
        name: ['radishes', '', '', '', ''],
        axis: 'day 1'
    }, {
        desc: 'with mean',
        patch: function(fig) {
            fig.data.forEach(function(trace) {
                trace.boxmean = true;
            });
            return fig;
        },
        nums: ['median: 0.55', 'min: 0', 'q1: 0.3', 'q3: 0.6', 'max: 0.7', 'mean: 0.45'],
        name: ['radishes', '', '', '', '', ''],
        axis: 'day 1'
    }, {
        desc: 'with sd',
        patch: function(fig) {
            fig.data.forEach(function(trace) {
                trace.boxmean = 'sd';
            });
            return fig;
        },
        nums: [
            'median: 0.55', 'min: 0', 'q1: 0.3', 'q3: 0.6', 'max: 0.7',
            'mean ?? ??: 0.45 ?? 0.2362908'
        ],
        name: ['radishes', '', '', '', '', ''],
        axis: 'day 1'
    }, {
        desc: 'with boxpoints fences',
        mock: require('@mocks/boxplots_outliercolordflt.json'),
        pos: [350, 200],
        nums: [
            'median: 8.15', 'min: 0.75', 'q1: 6.8',
            'q3: 10.25', 'max: 23.25', 'lower fence: 5.25', 'upper fence: 12'
        ],
        name: ['', '', '', '', '', '', ''],
        axis: 'trace 0'
    }, {
        desc: 'with overlaid boxes',
        patch: function(fig) {
            fig.layout.boxmode = 'overlay';
            return fig;
        },
        nums: [
            'q1: 0.3', 'median: 0.45', 'q3: 0.6', 'max: 1', 'median: 0.55', 'min: 0.2',
            'q3: 0.6', 'max: 0.7', 'median: 0.45', 'min: 0.1', 'q3: 0.6', 'max: 0.9'
        ],
        name: [
            '', 'kale', '', '', 'radishes', '',
            '', '', 'carrots', '', '', ''
        ],
        axis: 'day 1'
    }, {
        desc: 'hoveron points | hovermode closest',
        patch: function(fig) {
            fig.data.forEach(function(trace) {
                trace.boxpoints = 'all';
                trace.hoveron = 'points';
            });
            fig.layout.hovermode = 'closest';
            return fig;
        },
        nums: '(day 1, 0.7)',
        name: 'radishes'
    }, {
        desc: 'hoveron points | hovermode x',
        patch: function(fig) {
            fig.data.forEach(function(trace) {
                trace.boxpoints = 'all';
                trace.hoveron = 'points';
            });
            fig.layout.hovermode = 'x';
            return fig;
        },
        nums: '0.7',
        name: 'radishes',
        axis: 'day 1'
    }, {
        desc: 'hoveron boxes+points | hovermode x (hover on box only - same result as base)',
        patch: function(fig) {
            fig.data.forEach(function(trace) {
                trace.boxpoints = 'all';
                trace.hoveron = 'points+boxes';
            });
            fig.layout.hovermode = 'x';
            return fig;
        },
        nums: ['median: 0.55', 'min: 0', 'q1: 0.3', 'q3: 0.6', 'max: 0.7'],
        name: ['radishes', '', '', '', ''],
        axis: 'day 1'
    }, {
        desc: 'hoveron boxes+points | hovermode x (box AND closest point)',
        patch: function(fig) {
            fig.data.forEach(function(trace) {
                trace.boxpoints = 'all';
                trace.hoveron = 'points+boxes';
                trace.pointpos = 0;
            });
            fig.layout.hovermode = 'x';
            return fig;
        },
        nums: ['0.6', 'median: 0.55', 'min: 0', 'q1: 0.3', 'q3: 0.6', 'max: 0.7'],
        name: ['radishes', 'radishes', '', '', '', ''],
        axis: 'day 1'
    }, {
        desc: 'text items on hover',
        patch: function(fig) {
            fig.data.forEach(function(trace) {
                trace.boxpoints = 'all';
                trace.hoveron = 'points';
                trace.text = trace.y.map(function(v) { return 'look:' + v; });
            });
            fig.layout.hovermode = 'closest';
            return fig;
        },
        nums: '(day 1, 0.7)\nlook:0.7',
        name: 'radishes'
    }, {
        desc: 'only text items on hover',
        patch: function(fig) {
            fig.data.forEach(function(trace) {
                trace.boxpoints = 'all';
                trace.hoveron = 'points';
                trace.text = trace.y.map(function(v) { return 'look:' + v; });
                trace.hoverinfo = 'text';
            });
            fig.layout.hovermode = 'closest';
            return fig;
        },
        nums: 'look:0.7',
        name: ''
    }].forEach(function(specs) {
        it('should generate correct hover labels ' + specs.desc, function(done) {
            run(specs).catch(fail).then(done);
        });
    });
});
