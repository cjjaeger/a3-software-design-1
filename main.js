/* Create a scatter plot of 1960 life expectancy (gdp) versus 2013 life expectancy (life_expectancy).*/

$(function() {
    // Variables to show
    var xVar = 'gdp';
    var yVar = 'life_expectancy';
    var chartData,
    nestedData;

    // Load data in using d3's csv function.
    d3.csv('data/prepped_data.csv', function(error, data) {
        var prepData = function() {
            chartData = data.map(function(d) {
                return {
                    x: d[xVar],
                    y: d[yVar],
                    id: d.country,
                    region: d.region
                };
            });
            nestedData = d3.nest()
              .key(function(d) {
                  return d.region;
              })
              .entries(chartData);
        }
        var scatter = donutChart().width(700).height(400);

        prepData();
        var chartWrapper ;
        var draw = function() {
            prepData();
            scatter.title("Chart");
            scatter.sliceVal("y");
            scatter.sliceCat("x");
            scatter.padAngle(5);
            scatter.cornerRadius(5);
            chartWrapper= d3.select('#vis').datum([chartData]).call(scatter);

            //myChart.param1(newValue);

        };
        var varChange =function(){
            prepData();

            // Initiation of chart
        var chartWrapper = d3.select('#my-div').datum([chartData]).call(scatter);
        scatter.width(600);
        // Update a chart parameter and the data (on some event handler)
        chartWrapper.datum([chartData]).call(scatter);
        }
        draw();
        $('select').on('change', function(d) {
            xVar = $(this).val();
            varChange();
        });

    // Initialize materialize style
    $('select').material_select()

    });
});
