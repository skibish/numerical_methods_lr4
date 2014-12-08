'use strict';

function getAdamsBashfort(h, t)
{
  var n = t / h + 1;
  var xAnalytics = [];
  var xSolution = [];
  var adams = 0;
  var error = [];
  var errorMax = 0;

  var pointsAnalytics = [];
  var pointsSolution = [];

  xAnalytics.push(1);
  xSolution.push(1);

  for(var i = 1; i <= n; i++) {
    var t = h * i;
    xAnalytics[i] = defaultAnalytics(t);

	if (i < 4) {
		// Euler formula
		xSolution[i] = (xSolution[i - 1] + h * defaultDerivative(xSolution[i - 1]));
	}
	else {
    var eulerPoint = (xSolution[i - 1] + h * defaultDerivative(xSolution[i - 1]));

		// Bashfort formula
		xSolution[i] = (xSolution[i - 1] + h/24 *
		(9 * defaultDerivative(eulerPoint)
		+ 19 * defaultDerivative(xSolution[i - 1])
		- 5 * defaultDerivative(xSolution[i - 2])
		+ defaultDerivative(xSolution[i - 3])));
	}

    error.push([t, Math.abs(xSolution[i] - xAnalytics[i])]);
    if(error[i] > errorMax) {
      errorMax = error[i];
    }

    pointsAnalytics.push([t, xAnalytics[i]]);
    pointsSolution.push([t, xSolution[i]]);
  }

  return [pointsAnalytics, pointsSolution, error, errorMax];
}
