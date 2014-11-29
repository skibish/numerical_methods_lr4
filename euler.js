'use strict';

/**
 * Given derivative function
 *
 * @param  {Number} x
 * @return {Number} x
 */
function defaultDerivative(x)
{
  return 0.9 * x - 0.2 * Math.pow(x, 2);
}

/**
 * Analytical solution
 *
 * @param  {Number} t
 * @return {Number} x
 */
function defaultAnalytics(t)
{
  return (0.9 * Math.pow(Math.E, 0.9 * t)) / (0.7 + 0.2 * Math.pow(Math.E, 0.9 * t));
}

/**
 * Euler method
 *
 * @param  {Number} h - steps
 * @param  {Number} t - interval [0, t]
 */
function euler(h, t)
{
  var n = t / h + 1;
  var xAnalytics = [];
  var xSolution = [];
  var error = [];
  var errorMax = 0;

  var pointsAnalytics = [];
  var pointsSolution = [];

  xAnalytics.push(1);
  xSolution.push(1);

  for(var i = 1; i <= n; i++) {
    var t = h * i;
    xAnalytics[i] = defaultAnalytics(t);

    // Euler formula
    xSolution[i] = (xSolution[i - 1] + h * defaultDerivative(xSolution[i - 1]));

    error.push([t, Math.abs(xSolution[i] - xAnalytics[i])]);
    if(error[i] > errorMax) {
      errorMax = error[i];
    }


    pointsAnalytics.push([t, xAnalytics[i]]);
    pointsSolution.push([t, xSolution[i]]);
  }

  return [pointsAnalytics, pointsSolution, error, errorMax];
}
