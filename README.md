# football-query-compiler
Query language for football stats

-- career for player. default stat type by position, career stats
aaron rodgers

-- career passing for aaron rodgers
passing for aaron rodgers

-- 2007 rushing for randall cobb
rushing for randall cobb
in 2007

--career passing and rushing for aaron rodgers
passing and rushing for aaron rodgers

----are these two the exact same?
-- 2007 2008 and 2009 stats for aaron rodgers
aaron rodgers
in 2007 and 2008 and 2009

-- 2007 - 2013 stats for aaron rodgers...
aaron rodgers
in 2007 through 2013

-- career stats by year
aaron rodgers
by year

-- stats by year for aaron rodgers from season 2007 to 2013
aaron rodgers
in 2007 through 2013
by year

--subject (proposition - for) // do we needthis?
--year range - propsition - in (prefix)
--stat slice (week, year) proposition - by (prefix)
-- stat type proposition - for (suffix)

conjunction
-- and - joins values together
----used with stats and years
-- through - creates range
