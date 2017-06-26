# football-query-compiler
Query language for football stats

## [see the compiler in action!](https://football-query-compiler-ex.herokuapp.com/)

## examples

minimal query, query stats for player for their positions primary stat type for their career, by year

`aaron rodgers`

career passing for aaron rodgers

`passing for aaron rodgers`

2007 rushing for randall cobb

`rushing for randall cobb in 2007`

career passing and rushing for aaron rodgers

`passing and rushing for aaron rodgers`

2007 2008 and 2009 stats for aaron rodgers

`aaron rodgers in 2007 and 2008 and 2009`

2007 - 2013 stats for aaron rodgers

`aaron rodgers in 2007 through 2013`

career stats by year

`aaron rodgers by week`

stats by year for aaron rodgers from season 2007 to 2013

`aaron rodgers in 2007 through 2013 by year`


## TODO query syntax notation for language

* subject (proposition - for) 
* year range - propsition - in (prefix)
* stat slice (week, year) proposition - by (prefix)
* stat type proposition - for (suffix)
