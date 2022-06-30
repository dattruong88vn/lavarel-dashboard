/**
* Copyright 2012-2017, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/


'use strict';


module.exports = function eventData(out, pt) {
    // standard cartesian event data
    out.x = pt.xVal;
    out.y = pt.yVal;
    out.xaxis = pt.xa;
    out.yaxis = pt.ya;

    // specific to histogram
    // CDFs do not have pts (yet?)
    if(pt.pts) {
        out.pointNumbers = pt.pts;
        out.binNumber = out.pointNumber;
        delete out.pointNumber;
    }

    return out;
};
